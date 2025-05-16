/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type ContractCustomizer = CollectionCustomizer<Schema, 'contract'>;
export type ContractRecord = TPartialRow<Schema, 'contract'>;
export type ContractConditionTree = TConditionTree<Schema, 'contract'>;
export type ContractFilter = TPaginatedFilter<Schema, 'contract'>;
export type ContractSortClause = TSortClause<Schema, 'contract'>;
export type ContractAggregation = TAggregation<Schema, 'contract'>;

export type CustomerCustomizer = CollectionCustomizer<Schema, 'customer'>;
export type CustomerRecord = TPartialRow<Schema, 'customer'>;
export type CustomerConditionTree = TConditionTree<Schema, 'customer'>;
export type CustomerFilter = TPaginatedFilter<Schema, 'customer'>;
export type CustomerSortClause = TSortClause<Schema, 'customer'>;
export type CustomerAggregation = TAggregation<Schema, 'customer'>;

export type DealCustomizer = CollectionCustomizer<Schema, 'deal'>;
export type DealRecord = TPartialRow<Schema, 'deal'>;
export type DealConditionTree = TConditionTree<Schema, 'deal'>;
export type DealFilter = TPaginatedFilter<Schema, 'deal'>;
export type DealSortClause = TSortClause<Schema, 'deal'>;
export type DealAggregation = TAggregation<Schema, 'deal'>;

export type HousingCustomizer = CollectionCustomizer<Schema, 'housing'>;
export type HousingRecord = TPartialRow<Schema, 'housing'>;
export type HousingConditionTree = TConditionTree<Schema, 'housing'>;
export type HousingFilter = TPaginatedFilter<Schema, 'housing'>;
export type HousingSortClause = TSortClause<Schema, 'housing'>;
export type HousingAggregation = TAggregation<Schema, 'housing'>;

export type PgStatStatementsCustomizer = CollectionCustomizer<Schema, 'pg_stat_statements'>;
export type PgStatStatementsRecord = TPartialRow<Schema, 'pg_stat_statements'>;
export type PgStatStatementsConditionTree = TConditionTree<Schema, 'pg_stat_statements'>;
export type PgStatStatementsFilter = TPaginatedFilter<Schema, 'pg_stat_statements'>;
export type PgStatStatementsSortClause = TSortClause<Schema, 'pg_stat_statements'>;
export type PgStatStatementsAggregation = TAggregation<Schema, 'pg_stat_statements'>;

export type PgStatStatementsInfoCustomizer = CollectionCustomizer<Schema, 'pg_stat_statements_info'>;
export type PgStatStatementsInfoRecord = TPartialRow<Schema, 'pg_stat_statements_info'>;
export type PgStatStatementsInfoConditionTree = TConditionTree<Schema, 'pg_stat_statements_info'>;
export type PgStatStatementsInfoFilter = TPaginatedFilter<Schema, 'pg_stat_statements_info'>;
export type PgStatStatementsInfoSortClause = TSortClause<Schema, 'pg_stat_statements_info'>;
export type PgStatStatementsInfoAggregation = TAggregation<Schema, 'pg_stat_statements_info'>;


export type Schema = {
  'contract': {
    plain: {
      'commission_rate': number | null;
      'created_at': string;
      'deal_id': number;
      'displayName': string | null;
      'end_at': string | null;
      'id': number;
      'start_at': string | null;
      'updated_at': string;
    };
    nested: {
      'deal': Schema['deal']['plain'] & Schema['deal']['nested'];
    };
    flat: {
      'deal:closed_at': string | null;
      'deal:created_at': string;
      'deal:customer_id': number;
      'deal:housing_id': number;
      'deal:id': number;
      'deal:owner': string | null;
      'deal:stage': string | null;
      'deal:updated_at': string;
      'deal:customer:created_at': string;
      'deal:customer:customer_type': 'customer' | 'ex-customer' | 'lead' | null;
      'deal:customer:email': string;
      'deal:customer:first_name': string | null;
      'deal:customer:id': number;
      'deal:customer:last_name': string | null;
      'deal:customer:phone': string | null;
      'deal:customer:updated_at': string;
      'deal:housing:address': string;
      'deal:housing:area': number | null;
      'deal:housing:city': string;
      'deal:housing:created_at': string;
      'deal:housing:description': string | null;
      'deal:housing:displayName': string | null;
      'deal:housing:id': number;
      'deal:housing:monthly_rent': number | null;
      'deal:housing:num_rooms': number | null;
      'deal:housing:picture': string | null;
      'deal:housing:updated_at': string;
      'deal:housing:zip': string;
    };
  };
  'customer': {
    plain: {
      'created_at': string;
      'customer_type': 'customer' | 'ex-customer' | 'lead' | null;
      'email': string;
      'first_name': string | null;
      'id': number;
      'last_name': string | null;
      'phone': string | null;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'deal': {
    plain: {
      'closed_at': string | null;
      'created_at': string;
      'customer_id': number;
      'housing_id': number;
      'id': number;
      'owner': string | null;
      'stage': string | null;
      'updated_at': string;
    };
    nested: {
      'customer': Schema['customer']['plain'] & Schema['customer']['nested'];
      'housing': Schema['housing']['plain'] & Schema['housing']['nested'];
    };
    flat: {
      'customer:created_at': string;
      'customer:customer_type': 'customer' | 'ex-customer' | 'lead' | null;
      'customer:email': string;
      'customer:first_name': string | null;
      'customer:id': number;
      'customer:last_name': string | null;
      'customer:phone': string | null;
      'customer:updated_at': string;
      'housing:address': string;
      'housing:area': number | null;
      'housing:city': string;
      'housing:created_at': string;
      'housing:description': string | null;
      'housing:displayName': string | null;
      'housing:id': number;
      'housing:monthly_rent': number | null;
      'housing:num_rooms': number | null;
      'housing:picture': string | null;
      'housing:updated_at': string;
      'housing:zip': string;
    };
  };
  'housing': {
    plain: {
      'address': string;
      'area': number | null;
      'city': string;
      'created_at': string;
      'description': string | null;
      'displayName': string | null;
      'id': number;
      'monthly_rent': number | null;
      'num_rooms': number | null;
      'picture': string | null;
      'updated_at': string;
      'zip': string;
    };
    nested: {};
    flat: {};
  };
  'pg_stat_statements': {
    plain: {
      'blk_read_time': number | null;
      'blk_write_time': number | null;
      'calls': number | null;
      'jit_emission_count': number | null;
      'jit_emission_time': number | null;
      'jit_functions': number | null;
      'jit_generation_time': number | null;
      'jit_inlining_count': number | null;
      'jit_inlining_time': number | null;
      'jit_optimization_count': number | null;
      'jit_optimization_time': number | null;
      'local_blks_dirtied': number | null;
      'local_blks_hit': number | null;
      'local_blks_read': number | null;
      'local_blks_written': number | null;
      'max_exec_time': number | null;
      'max_plan_time': number | null;
      'mean_exec_time': number | null;
      'mean_plan_time': number | null;
      'min_exec_time': number | null;
      'min_plan_time': number | null;
      'plans': number | null;
      'query': string | null;
      'queryid': number | null;
      'rows': number | null;
      'shared_blks_dirtied': number | null;
      'shared_blks_hit': number | null;
      'shared_blks_read': number | null;
      'shared_blks_written': number | null;
      'stddev_exec_time': number | null;
      'stddev_plan_time': number | null;
      'temp_blk_read_time': number | null;
      'temp_blk_write_time': number | null;
      'temp_blks_read': number | null;
      'temp_blks_written': number | null;
      'toplevel': boolean;
      'total_exec_time': number | null;
      'total_plan_time': number | null;
      'wal_bytes': number | null;
      'wal_fpi': number | null;
      'wal_records': number | null;
    };
    nested: {};
    flat: {};
  };
  'pg_stat_statements_info': {
    plain: {
      'dealloc': number;
      'stats_reset': string | null;
    };
    nested: {};
    flat: {};
  };
};
