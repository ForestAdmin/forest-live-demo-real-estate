// npm run start:watch
import type { SslMode } from '@forestadmin/datasource-sql';
import type { Schema } from './typings';

import 'dotenv/config';
import { ActionContext, createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';
import liveDemoBlocker, { blockActionForLiveDemoUser } from '@forestadmin-experimental/live-demo-blocker';

// This object allows to configure your Forest Admin panel
const agent = createAgent<Schema>({
  // Security tokens
  authSecret: process.env.FOREST_AUTH_SECRET!,
  envSecret: process.env.FOREST_ENV_SECRET!,

  // Make sure to set NODE_ENV to 'production' when you deploy your project
  isProduction: process.env.NODE_ENV === 'production',

  // Autocompletion of collection names and fields
  typingsPath: './typings.ts',
  typingsMaxDepth: 5,
});

// Connect your datasources
// All options are documented at https://docs.forestadmin.com/developer-guide-agents-nodejs/data-sources/connection
agent.addDataSource(
  createSqlDataSource({
    uri: process.env.DATABASE_URL,
    schema: process.env.DATABASE_SCHEMA,
    sslMode: process.env.DATABASE_SSL_MODE as SslMode,
  }),
);

agent.use(liveDemoBlocker);

// SMART ACTIONS
// Deal
// TODO: add constraint stage has to be "new"
agent.customizeCollection('deal', collection => {
  collection.addAction('Close deal and create contract', {
    scope: 'Single',
    form: [
      {
        label: 'commission_rate',
        description: 'Commission rate',
        type: 'Number',
        isRequired: true,
      },
      {
        label: 'start_at',
        description: 'Start date of the contract',
        type: 'Date',
        isRequired: true,
      },
    ],
    execute: async (context, resultBuilder) => {
      const result = blockActionForLiveDemoUser(context as unknown as ActionContext, resultBuilder);
      if (result) return result;

      // Retrieve values entered in the form and columns from the selected record.
      const { commission_rate, start_at } = context.formValues;
      const { id, owner } = await context.getRecord([
        'id',
        'owner'
      ]);

      // TODO: create the contract
      context.dataSource.getCollection('contract').create([{
        'deal_id': id,
        'commission_rate': commission_rate,
        'start_at': start_at
      }]);

      // Close deal
      const now = new Date();
      await context.collection.update(context.filter, { stage: 'closed', closed_at: now.toISOString() });

      // Success
      return resultBuilder.success('Deal closed and contract created !');
    },
  });
});

// TODO: add constraint stage has to be "new"
agent.customizeCollection('deal', collection =>
  collection.addAction('Close deal', {
    scope: 'Bulk',
    execute: async (context, resultBuilder) => {
      const result = blockActionForLiveDemoUser(context as unknown as ActionContext, resultBuilder);
      if (result) return result;

      const now = new Date();
      await context.collection.update(context.filter, { stage: 'closed', closed_at: now.toISOString() });
      return resultBuilder.success('Deal closed !');
    },
  }),
);

// TODO: add constraint stage has to be "new"
agent.customizeCollection('deal', collection =>
  collection.addAction('Mark as rejected', {
    scope: 'Bulk',
    execute: async (context, resultBuilder) => {
      const result = blockActionForLiveDemoUser(context as unknown as ActionContext, resultBuilder);
      if (result) return result;

      await context.collection.update(context.filter, { stage: 'rejected' });
      return resultBuilder.success('Deal rejected: please add a note to explain why');
    },
  }),
);

// TODO: to review by Steve > how to create a default "new" value for the read-only "stage" column
agent.customizeCollection('deal', collection =>
  collection.replaceFieldWriting('stage', async (value, context) => {
    switch (context.action) {
      case 'create':
        return { stage: 'new' };
      default:
        throw new Error('Unexpected value');
    }
  })
);

// Customer
agent.customizeCollection('customer', collection =>
  collection.addAction('Mark as customer', {
    scope: 'Single',
    execute: async (context, resultBuilder) => {
      const result = blockActionForLiveDemoUser(context as unknown as ActionContext, resultBuilder);
      if (result) return result;

      await context.collection.update(context.filter, { customer_type: 'customer' });
    },
}),
);

agent.customizeCollection('customer', collection =>
  collection.addAction('Mark as ex-customer', {
    scope: 'Single',
    execute: async (context, resultBuilder) => {
      const result = blockActionForLiveDemoUser(context as unknown as ActionContext, resultBuilder);
      if (result) return result;

      await context.collection.update(context.filter, { customer_type: 'ex-customer' });
    },
}),
);

// SMART FIELDS
// Housing
agent.customizeCollection('housing', collection => {
  collection.addField('displayName', {
    // Type of the new field
    columnType: 'String',

    // Dependencies which are needed to compute the new field (must not be empty)
    dependencies: ['num_rooms', 'monthly_rent', 'city'],

    // Compute function for the new field
    getValues: (records, context) =>
      records.map(r => `${r.num_rooms} rooms for \$${r.monthly_rent} in ${r.city}`),
  });
});

// Contract
agent.customizeCollection('contract', collection => {
  collection.addField('displayName', {
    // Type of the new field
    columnType: 'String',

    // Dependencies which are needed to compute the new field (must not be empty)
    dependencies: ['deal:housing:num_rooms', 'deal:housing:monthly_rent', 'deal:housing:city'],

    // Compute function for the new field
    getValues: (records, context) =>
      records.map(r => `${r.deal.housing.num_rooms} room(s) for \$${r.deal.housing.monthly_rent} in ${r.deal.housing.city}`),
  });
});


// Add customizations here.
// For instance, you can code custom actions, charts, create new fields or relationships, load plugins.
// As your project grows, you will need to split it into multiple files!
//
// Here is some code to get your started
//
// agent.customizeCollection('products', (collection: CollectionCustomizer<Schema, 'products'>) => {
//   // Actions are documented here:
//   // https://docs.forestadmin.com/developer-guide-agents-nodejs/agent-customization/actions
//   collection.addAction('Order new batch from supplier', {
//     scope: 'Single', // This action can be triggered product by product
//     form: [{ label: 'Quantity', type: 'Number', isRequired: true }],
//     execute: async (context, resultBuilder) => {
//       const product = await context.getRecord(['id', 'name'])
//       const quantity = context.formValues['Quantity'];

//       // ... Perform work here ...

//       return resultBuilder.success(`Your order for a batch of ${quantity} '${product.name}' was sent`);
//     }
//   });

//   // Search customization is documented here:
//   // https://docs.forestadmin.com/developer-guide-agents-nodejs/agent-customization/search
//   collection.replaceSearch(searchString => {
//     // user has typed a product id, let's only that column
//     if (searchString.match(/^prdid[\d]{8}/$))
//       return { field: 'id', operator: 'Equal', value: searchString };

//     // Otherwise assume that user wants to search for a product by name
//     return { field: 'name', operator: 'Contains', value: searchString };
//   });
// });

// Expose an HTTP endpoint.
agent.mountOnStandaloneServer(Number(process.env.APPLICATION_PORT || process.env.PORT));

// Start the agent.
agent.start().catch(error => {
  console.error('\x1b[31merror:\x1b[0m Forest Admin agent failed to start\n');
  console.error('');
  console.error(error.stack);
  process.exit(1);
});
function echo(arg0: string) {
  throw new Error('Function not implemented.');
}

