/* eslint-disable */
export type Schema = {
  'contract': {
    plain: {
      'id': number;
      'deal_id': number;
      'commission_rate': number;
      'start_at': string;
      'end_at': string;
      'created_at': string;
      'updated_at': string;
      'displayName': string;
    };
    nested: {
      'deal': Schema['deal']['plain'] & Schema['deal']['nested'];
    };
    flat: {
      'deal:id': number;
      'deal:owner': string;
      'deal:customer_id': number;
      'deal:housing_id': number;
      'deal:stage': string;
      'deal:closed_at': string;
      'deal:created_at': string;
      'deal:updated_at': string;
      'deal:customer:id': number;
      'deal:customer:first_name': string;
      'deal:customer:last_name': string;
      'deal:customer:email': string;
      'deal:customer:phone': string;
      'deal:customer:customer_type': 'lead' | 'customer' | 'ex-customer';
      'deal:customer:created_at': string;
      'deal:customer:updated_at': string;
      'deal:housing:id': number;
      'deal:housing:picture': string;
      'deal:housing:address': string;
      'deal:housing:zip': string;
      'deal:housing:city': string;
      'deal:housing:area': number;
      'deal:housing:num_rooms': number;
      'deal:housing:monthly_rent': number;
      'deal:housing:description': string;
      'deal:housing:created_at': string;
      'deal:housing:updated_at': string;
      'deal:housing:displayName': string;
    };
  };
  'customer': {
    plain: {
      'id': number;
      'first_name': string;
      'last_name': string;
      'email': string;
      'phone': string;
      'customer_type': 'lead' | 'customer' | 'ex-customer';
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'deal': {
    plain: {
      'id': number;
      'owner': string;
      'customer_id': number;
      'housing_id': number;
      'stage': string;
      'closed_at': string;
      'created_at': string;
      'updated_at': string;
    };
    nested: {
      'customer': Schema['customer']['plain'] & Schema['customer']['nested'];
      'housing': Schema['housing']['plain'] & Schema['housing']['nested'];
    };
    flat: {
      'customer:id': number;
      'customer:first_name': string;
      'customer:last_name': string;
      'customer:email': string;
      'customer:phone': string;
      'customer:customer_type': 'lead' | 'customer' | 'ex-customer';
      'customer:created_at': string;
      'customer:updated_at': string;
      'housing:id': number;
      'housing:picture': string;
      'housing:address': string;
      'housing:zip': string;
      'housing:city': string;
      'housing:area': number;
      'housing:num_rooms': number;
      'housing:monthly_rent': number;
      'housing:description': string;
      'housing:created_at': string;
      'housing:updated_at': string;
      'housing:displayName': string;
    };
  };
  'housing': {
    plain: {
      'id': number;
      'picture': string;
      'address': string;
      'zip': string;
      'city': string;
      'area': number;
      'num_rooms': number;
      'monthly_rent': number;
      'description': string;
      'created_at': string;
      'updated_at': string;
      'displayName': string;
    };
    nested: {};
    flat: {};
  };
};
