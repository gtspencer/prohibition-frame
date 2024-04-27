import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'reservoirprotocol/5.296.1 (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Get a list of tokens with full metadata. This is useful for showing a single token page,
   * or scenarios that require more metadata.
   *
   * @summary Tokens
   */
  getTokensV7(metadata?: types.GetTokensV7MetadataParam): Promise<FetchResponse<200, types.GetTokensV7Response200>> {
    return this.core.fetch('/tokens/v7', 'get', metadata);
  }

  /**
   * Get the latest price event per token in a collection, so that you can listen to future
   * events and keep track of prices
   *
   * @summary Token Events Bootstrap
   */
  getTokensBootstrapV1(metadata?: types.GetTokensBootstrapV1MetadataParam): Promise<FetchResponse<200, types.GetTokensBootstrapV1Response200>> {
    return this.core.fetch('/tokens/bootstrap/v1', 'get', metadata);
  }

  /**
   * This API will return the best price of every token in a collection that is currently on
   * sale. Note: Prices are returned in the native currency of the network.
   *
   * @summary Token Prices
   */
  getTokensFloorV1(metadata?: types.GetTokensFloorV1MetadataParam): Promise<FetchResponse<200, types.GetTokensFloorV1Response200>> {
    return this.core.fetch('/tokens/floor/v1', 'get', metadata);
  }

  /**
   * This API is optimized for quickly fetching a list of tokens ids in by collection,
   * contract, token set id. 
   *
   * @summary Token IDs
   */
  getTokensIdsV1(metadata?: types.GetTokensIdsV1MetadataParam): Promise<FetchResponse<200, types.GetTokensIdsV1Response200>> {
    return this.core.fetch('/tokens/ids/v1', 'get', metadata);
  }

  /**
   * This API return the recent flagged/un-flagged tokens across all collections sorted by
   * change time
   *
   * @summary Flagged Tokens
   */
  getTokensFlagChangesV1(metadata?: types.GetTokensFlagChangesV1MetadataParam): Promise<FetchResponse<200, types.GetTokensFlagChangesV1Response200>> {
    return this.core.fetch('/tokens/flag/changes/v1', 'get', metadata);
  }

  /**
   * Use this API to create a `tokenSetId` to call specific tokens from a collection. Adding
   * or removing a tokenId will change the response. See an example below.
   *
   *  Input of `0xd774557b647330c91bf44cfeab205095f7e6c367:1` and
   * `0xd774557b647330c91bf44cfeab205095f7e6c367:2`
   *
   *  Output of
   * `list:0xd774557b647330c91bf44cfeab205095f7e6c367:0xb6fd98eeb7e08fc521f11511289afe4d8e873fd7a3fb76ab757fa47c23f596e9`
   *
   *  Notes:
   *
   * - Include `list:` when using this `tokenSetId` for it to work successfully.
   *
   * - You cannot adjust tokens within a `tokenSetId`. Please create a new set.
   *
   * - Use the `/tokens/ids` endpoint to get a list of tokens within a set.
   *
   * @summary Create token set
   */
  postTokensetsV2(body: types.PostTokensetsV2BodyParam): Promise<FetchResponse<200, types.PostTokensetsV2Response200>> {
    return this.core.fetch('/token-sets/v2', 'post', body);
  }

  /**
   * Token metadata is never automatically refreshed, but may be manually refreshed with this
   * API.
   *
   * Caution: This API should be used in moderation, like only when missing data is
   * discovered. Calling it in bulk or programmatically will result in your API key getting
   * rate limited.
   *
   * @summary Refresh Token
   */
  postTokensRefreshV2(body: types.PostTokensRefreshV2BodyParam): Promise<FetchResponse<200, types.PostTokensRefreshV2Response200>> {
    return this.core.fetch('/tokens/refresh/v2', 'post', body);
  }

  /**
   * Use this API to explore a collection's metadata and statistics (sales, volume, etc).
   *
   * @summary Collections
   */
  getCollectionsV7(metadata?: types.GetCollectionsV7MetadataParam): Promise<FetchResponse<200, types.GetCollectionsV7Response200>> {
    return this.core.fetch('/collections/v7', 'get', metadata);
  }

  /**
   * Search Collections (Cross Chain)
   *
   */
  getCollectionsSearchV1(metadata: types.GetCollectionsSearchV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsSearchV1Response200>> {
    return this.core.fetch('/collections/search/v1', 'get', metadata);
  }

  /**
   * Get trending selling/minting collections
   *
   * @summary Top Trending Collections
   */
  getCollectionsTrendingV1(metadata?: types.GetCollectionsTrendingV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsTrendingV1Response200>> {
    return this.core.fetch('/collections/trending/v1', 'get', metadata);
  }

  /**
   * Get top trending mints
   *
   * @summary Top Trending Mints
   */
  getCollectionsTrendingmintsV1(metadata?: types.GetCollectionsTrendingmintsV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsTrendingmintsV1Response200>> {
    return this.core.fetch('/collections/trending-mints/v1', 'get', metadata);
  }

  /**
   * Search Collections
   *
   */
  getSearchCollectionsV2(metadata?: types.GetSearchCollectionsV2MetadataParam): Promise<FetchResponse<200, types.GetSearchCollectionsV2Response200>> {
    return this.core.fetch('/search/collections/v2', 'get', metadata);
  }

  /**
   * Get top traders for a particular collection
   *
   * @summary Top Traders
   */
  getCollectionsCollectionToptradersV1(metadata: types.GetCollectionsCollectionToptradersV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionToptradersV1Response200>> {
    return this.core.fetch('/collections/{collection}/top-traders/v1', 'get', metadata);
  }

  /**
   * This API returns recommended marketplace configurations given a collection id
   *
   * @summary Marketplace configurations by collection
   */
  getCollectionsCollectionMarketplaceconfigurationsV2(metadata: types.GetCollectionsCollectionMarketplaceconfigurationsV2MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionMarketplaceconfigurationsV2Response200>> {
    return this.core.fetch('/collections/{collection}/marketplace-configurations/v2', 'get', metadata);
  }

  /**
   * Get a list of bids (offers), filtered by collection.
   *
   * @summary Collection Bids (offers)
   */
  getCollectionsCollectionidBidsV1(metadata: types.GetCollectionsCollectionidBidsV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionidBidsV1Response200>> {
    return this.core.fetch('/collections/{collectionId}/bids/v1', 'get', metadata);
  }

  /**
   * Array of collections to gather in a set. Adding or removing a collection will change the
   * response. You may use this set when `collectionSetId` is an available param. The max
   * limit of collection in an array is 500. An example is below.
   *
   * `"collections": "0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623",
   * "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"`
   *
   * `"collectionsSetId": "8daa732ebe5db23f267e58d52f1c9b1879279bcdf4f78b8fb563390e6946ea65"`
   *
   * @summary Create collection set
   */
  postCollectionssetsV1(body: types.PostCollectionssetsV1BodyParam): Promise<FetchResponse<200, types.PostCollectionssetsV1Response200>> {
    return this.core.fetch('/collections-sets/v1', 'post', body);
  }

  /**
   * Array of contracts to gather in a set. Adding or removing a contract will change the
   * response. You may use this set when contractSetId is an available param. Max limit of
   * contracts passed in an array is 500. An example is below.
   *
   * `"contracts": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
   * "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"`
   *
   * `"contractsSetId": "74cc9bdc0824e92de13c75213015916557fcf8187e43b34a8e77175cd03d1931"
   *
   * @summary Create contracts set
   */
  postContractssetsV1(body: types.PostContractssetsV1BodyParam): Promise<FetchResponse<200, types.PostContractssetsV1Response200>> {
    return this.core.fetch('/contracts-sets/v1', 'post', body);
  }

  /**
   * Use this API to refresh a collection metadata. Only use this endpoint when you notice
   * multiple tokens with incorrect metadata. Otherwise, refresh single token metadata.
   * Collections with over 30,000 tokens require admin key override, so please contact
   * technical support for assistance.
   *
   *  Collection metadata is automatically updated at 23:30 UTC daily for:
   *
   * - Top 500 Collection by 24hr Volume
   *
   * - Collections Minted 1 Day Ago
   *
   * - Collections Minted 7 Days Ago
   *
   *  Caution: This API should be used in moderation, like only when missing data is
   * discovered. Calling it in bulk or programmatically will result in your API key getting
   * rate limited.
   *
   * @summary Refresh Collection
   */
  postCollectionsRefreshV2(body: types.PostCollectionsRefreshV2BodyParam, metadata?: types.PostCollectionsRefreshV2MetadataParam): Promise<FetchResponse<200, types.PostCollectionsRefreshV2Response200>> {
    return this.core.fetch('/collections/refresh/v2', 'post', body, metadata);
  }

  /**
   * Use this API to see stats on a specific attribute within a collection. This endpoint
   * will return `tokenCount`, `onSaleCount`, `sampleImages`, and `floorAskPrices` by
   * default.
   *
   * - `floorAskPrices` will not be returned on attributes with more than 10k tokens.
   *
   * @summary Explore attributes
   */
  getCollectionsCollectionAttributesExploreV5(metadata: types.GetCollectionsCollectionAttributesExploreV5MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesExploreV5Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/explore/v5', 'get', metadata);
  }

  /**
   * Use this API to see all possible attributes within a collection.
   *
   * - `floorAskPrice` for all attributes might not be returned on collections with more than
   * 10k tokens. 
   *
   * - Attributes are case sensitive. 
   *
   * - Attributes will return a maximum of 500 values.
   *
   * @summary All attributes
   */
  getCollectionsCollectionAttributesAllV4(metadata: types.GetCollectionsCollectionAttributesAllV4MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesAllV4Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/all/v4', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a collection including sales, asks, transfers,
   * mints, bids, cancelled bids, and cancelled asks types.
   *
   * @summary Collection activity
   */
  getCollectionsActivityV6(metadata?: types.GetCollectionsActivityV6MetadataParam): Promise<FetchResponse<200, types.GetCollectionsActivityV6Response200>> {
    return this.core.fetch('/collections/activity/v6', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a user including sales, asks, transfers, mints,
   * bids, cancelled bids, and cancelled asks types.
   *
   * @summary Users activity
   */
  getUsersActivityV6(metadata: types.GetUsersActivityV6MetadataParam): Promise<FetchResponse<200, types.GetUsersActivityV6Response200>> {
    return this.core.fetch('/users/activity/v6', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a token activity including sales, asks,
   * transfers, mints, bids, cancelled bids, and cancelled asks types.
   *
   * @summary Token activity
   */
  getTokensTokenActivityV5(metadata: types.GetTokensTokenActivityV5MetadataParam): Promise<FetchResponse<200, types.GetTokensTokenActivityV5Response200>> {
    return this.core.fetch('/tokens/{token}/activity/v5', 'get', metadata);
  }

  /**
   * Get a list of asks (listings), filtered by token, collection or maker. This API is
   * designed for efficiently ingesting large volumes of orders, for external processing.
   *
   *  To get all orders unflitered, select `sortBy` to `updatedAt`. No need to pass any other
   * param. This will return any orders for any collections, token, attribute, etc.
   *
   *  Please mark `excludeEOA` as `true` to exclude Blur orders.
   *
   * @summary Asks (listings)
   */
  getOrdersAsksV5(metadata?: types.GetOrdersAsksV5MetadataParam): Promise<FetchResponse<200, types.GetOrdersAsksV5Response200>> {
    return this.core.fetch('/orders/asks/v5', 'get', metadata);
  }

  /**
   * Get a list of bids (offers), filtered by token, collection or maker. This API is
   * designed for efficiently ingesting large volumes of orders, for external processing.
   *
   *  There are a different kind of bids than can be returned:
   *
   * - To get all orders unfiltered, select `sortBy` to `updatedAt`. No need to pass any
   * other param. This will return any orders for any collections, token, attribute, etc. 
   *
   * - Inputting a 'contract' will return token and attribute bids.
   *
   * - Inputting a 'collection-id' will return collection wide bids.
   *
   * - Please mark `excludeEOA` as `true` to exclude Blur orders.
   *
   * @summary Bids (offers)
   */
  getOrdersBidsV6(metadata?: types.GetOrdersBidsV6MetadataParam): Promise<FetchResponse<200, types.GetOrdersBidsV6Response200>> {
    return this.core.fetch('/orders/bids/v6', 'get', metadata);
  }

  /**
   * Get the depth of a token or collection.
   *
   * @summary Orders depth
   */
  getOrdersDepthV1(metadata: types.GetOrdersDepthV1MetadataParam): Promise<FetchResponse<200, types.GetOrdersDepthV1Response200>> {
    return this.core.fetch('/orders/depth/v1', 'get', metadata);
  }

  /**
   * Get recent sales for a contract or token. Paid mints are returned in this `sales`
   * endpoint, free mints can be found in the `/activities/` endpoints. Array of contracts
   * max limit is 20.
   *
   * @summary Sales
   */
  getSalesV6(metadata?: types.GetSalesV6MetadataParam): Promise<FetchResponse<200, types.GetSalesV6Response200>> {
    return this.core.fetch('/sales/v6', 'get', metadata);
  }

  /**
   * Get recent transfers for a contract or token.
   *
   * @summary Historical token transfers
   */
  getTransfersV4(metadata?: types.GetTransfersV4MetadataParam): Promise<FetchResponse<200, types.GetTransfersV4Response200>> {
    return this.core.fetch('/transfers/v4', 'get', metadata);
  }

  /**
   * Note: this API is optimized for bulk access, and offers minimal filters/metadata. If you
   * need more flexibility, try the `NFT API > Transfers` endpoint
   *
   * @summary Bulk historical transfers
   */
  getTransfersBulkV2(metadata?: types.GetTransfersBulkV2MetadataParam): Promise<FetchResponse<200, types.GetTransfersBulkV2Response200>> {
    return this.core.fetch('/transfers/bulk/v2', 'get', metadata);
  }

  /**
   * Every time an ask status changes, an event is generated. This API is designed to be
   * polled at high frequency, in order to keep an external system in sync with accurate
   * prices for any token.
   *
   * There are multiple event types, which describe what caused the change in price:
   *
   * - `new-order` > new listing at a lower price
   *
   * - `expiry` > the previous best listing expired
   *
   * - `sale` > the previous best listing was filled
   *
   * - `cancel` > the previous best listing was canceled
   *
   * - `balance-change` > the best listing was invalidated due to no longer owning the NFT
   *
   * - `approval-change` > the best listing was invalidated due to revoked approval
   *
   * - `revalidation` > manual revalidation of orders (e.g. after a bug fixed)
   *
   * - `reprice` > price update for dynamic orders (e.g. dutch auctions)
   *
   * - `bootstrap` > initial loading of data, so that all tokens have a price associated
   *
   * Note: Private listings (asks) will not appear in the results.
   *
   * @summary Asks status changes
   */
  getEventsAsksV3(metadata?: types.GetEventsAsksV3MetadataParam): Promise<FetchResponse<200, types.GetEventsAsksV3Response200>> {
    return this.core.fetch('/events/asks/v3', 'get', metadata);
  }

  /**
   * Every time a bid status changes, an event is generated. This API is designed to be
   * polled at high frequency, in order to keep an external system in sync with accurate
   * prices for any token.
   *
   * There are multiple event types, which describe what caused the change in price:
   *
   * - `new-order` > new offer at a lower price
   *
   * - `expiry` > the previous best offer expired
   *
   * - `sale` > the previous best offer was filled
   *
   * - `cancel` > the previous best offer was canceled
   *
   * - `balance-change` > the best offer was invalidated due to no longer owning the NFT
   *
   * - `approval-change` > the best offer was invalidated due to revoked approval
   *
   * - `revalidation` > manual revalidation of orders (e.g. after a bug fixed)
   *
   * - `reprice` > price update for dynamic orders (e.g. dutch auctions)
   *
   * - `bootstrap` > initial loading of data, so that all tokens have a price associated
   *
   * Some considerations to keep in mind
   *
   * - Selling a partial quantity of available 1155 tokens in a listing will generate a
   * `sale` and will have a new quantity.
   *
   * - Due to the complex nature of monitoring off-chain liquidity across multiple
   * marketplaces, including dealing with block re-orgs, events should be considered
   * 'relative' to the perspective of the indexer, ie _when they were discovered_, rather
   * than _when they happened_. A more deterministic historical record of price changes is in
   * development, but in the meantime, this method is sufficent for keeping an external
   * system in sync with the best available prices.
   *
   * @summary Bid status changes
   */
  getEventsBidsV3(metadata?: types.GetEventsBidsV3MetadataParam): Promise<FetchResponse<200, types.GetEventsBidsV3Response200>> {
    return this.core.fetch('/events/bids/v3', 'get', metadata);
  }

  /**
   * Every time the floor price of a collection changes (i.e. the 'floor ask'), an event is
   * generated. This API is designed to be polled at high frequency, in order to keep an
   * external system in sync with accurate prices for any token.
   *
   * There are multiple event types, which describe what caused the change in price:
   *
   * - `new-order` > new listing at a lower price
   *
   * - `expiry` > the previous best listing expired
   *
   * - `sale` > the previous best listing was filled
   *
   * - `cancel` > the previous best listing was cancelled
   *
   * - `balance-change` > the best listing was invalidated due to no longer owning the NFT
   *
   * - `approval-change` > the best listing was invalidated due to revoked approval
   *
   * - `revalidation` > manual revalidation of orders (e.g. after a bug fixed)
   *
   * - `reprice` > price update for dynamic orders (e.g. dutch auctions)
   *
   * - `bootstrap` > initial loading of data, so that all tokens have a price associated
   *
   * Some considerations to keep in mind
   *
   * - Selling a partial quantity of available 1155 tokens in a listing will generate a
   * `sale` and will have a new quantity.
   *
   * - Due to the complex nature of monitoring off-chain liquidity across multiple
   * marketplaces, including dealing with block re-orgs, events should be considered
   * 'relative' to the perspective of the indexer, ie _when they were discovered_, rather
   * than _when they happened_. A more deterministic historical record of price changes is in
   * development, but in the meantime, this method is sufficent for keeping an external
   * system in sync with the best available prices.
   *
   * - Events are only generated if the best price changes. So if a new order or sale happens
   * without changing the best price, no event is generated. This is more common with 1155
   * tokens, which have multiple owners and more depth. For this reason, if you need sales
   * data, use the Sales API.
   *
   * @summary Collection floor changes
   */
  getEventsCollectionsFlooraskV2(metadata?: types.GetEventsCollectionsFlooraskV2MetadataParam): Promise<FetchResponse<200, types.GetEventsCollectionsFlooraskV2Response200>> {
    return this.core.fetch('/events/collections/floor-ask/v2', 'get', metadata);
  }

  /**
   * Every time the top offer of a collection changes (i.e. the 'top bid'), an event is
   * generated. This API is designed to be polled at high frequency.
   *
   * There are multiple event types, which describe what caused the change in price:
   *
   * - `new-order` > new bid at a higher price
   *
   * - `expiry` > the previous top bid expired
   *
   * - `sale` > the previous top bid was accepted
   *
   * - `cancel` > the previous top bid was cancelled
   *
   * - `balance-change` > the top bid was invalidated due NFT no longer available
   *
   * - `approval-change` > the top bid was invalidated due to revoked approval
   *
   * - `revalidation` > manual revalidation of orders (e.g. after a bug fixed)
   *
   * - `reprice` > price update for dynamic orders (e.g. dutch auctions)
   *
   * - `bootstrap` > initial loading of data, so that all tokens have a price associated
   *
   * Some considerations to keep in mind
   *
   * - Selling a partial quantity of available 1155 tokens in a listing will generate a
   * `sale` and will have a new quantity.
   *
   * - Due to the complex nature of monitoring off-chain liquidity across multiple
   * marketplaces, including dealing with block re-orgs, events should be considered
   * 'relative' to the perspective of the indexer, ie _when they were discovered_, rather
   * than _when they happened_. A more deterministic historical record of price changes is in
   * development, but in the meantime, this method is sufficent for keeping an external
   * system in sync with the best available prices.
   *
   * - Events are only generated if the top bid changes. So if a new order or sale happens
   * without changing the top bid, no event is generated. This is more common with 1155
   * tokens, which have multiple owners and more depth. For this reason, if you need sales
   * data, use the Sales API.
   *
   * @summary Collection top bid changes
   */
  getEventsCollectionsTopbidV2(metadata?: types.GetEventsCollectionsTopbidV2MetadataParam): Promise<FetchResponse<200, types.GetEventsCollectionsTopbidV2Response200>> {
    return this.core.fetch('/events/collections/top-bid/v2', 'get', metadata);
  }

  /**
   * Every time the best price of a token changes (i.e. the 'floor ask'), an event is
   * generated. This API is designed to be polled at high frequency, in order to keep an
   * external system in sync with accurate prices for any token.
   *
   * There are multiple event types, which describe what caused the change in price:
   *
   * - `new-order` > new listing at a lower price
   *
   * - `expiry` > the previous best listing expired
   *
   * - `sale` > the previous best listing was filled
   *
   * - `cancel` > the previous best listing was cancelled
   *
   * - `balance-change` > the best listing was invalidated due to no longer owning the NFT
   *
   * - `approval-change` > the best listing was invalidated due to revoked approval
   *
   * - `revalidation` > manual revalidation of orders (e.g. after a bug fixed)
   *
   * - `reprice` > price update for dynamic orders (e.g. dutch auctions)
   *
   * - `bootstrap` > initial loading of data, so that all tokens have a price associated
   *
   * Some considerations to keep in mind
   *
   * - Selling a partial quantity of available 1155 tokens in a listing will generate a
   * `sale` and will have a new quantity.
   *
   * - Due to the complex nature of monitoring off-chain liquidity across multiple
   * marketplaces, including dealing with block re-orgs, events should be considered
   * 'relative' to the perspective of the indexer, ie _when they were discovered_, rather
   * than _when they happened_. A more deterministic historical record of price changes is in
   * development, but in the meantime, this method is sufficent for keeping an external
   * system in sync with the best available prices.
   *
   * - Events are only generated if the best price changes. So if a new order or sale happens
   * without changing the best price, no event is generated. This is more common with 1155
   * tokens, which have multiple owners and more depth. For this reason, if you need sales
   * data, use the Sales API.
   *
   * @summary Token price changes
   */
  getEventsTokensFlooraskV4(metadata?: types.GetEventsTokensFlooraskV4MetadataParam): Promise<FetchResponse<200, types.GetEventsTokensFlooraskV4Response200>> {
    return this.core.fetch('/events/tokens/floor-ask/v4', 'get', metadata);
  }

  /**
   * Get owners with various filters applied, and a summary of their ownership. Useful for
   * exploring top owners in a collection or attribute.
   *
   * @summary Owners
   */
  getOwnersV2(metadata?: types.GetOwnersV2MetadataParam): Promise<FetchResponse<200, types.GetOwnersV2Response200>> {
    return this.core.fetch('/owners/v2', 'get', metadata);
  }

  /**
   * This API can be used to find top common collections from an array of owners.
   *
   * @summary Common Collections
   */
  getOwnersCommoncollectionsV1(metadata: types.GetOwnersCommoncollectionsV1MetadataParam): Promise<FetchResponse<200, types.GetOwnersCommoncollectionsV1Response200>> {
    return this.core.fetch('/owners/common-collections/v1', 'get', metadata);
  }

  /**
   * Find which addresses own the most of a group of collections.
   *
   * @summary Owners intersection
   */
  getOwnersCrosscollectionsV1(metadata: types.GetOwnersCrosscollectionsV1MetadataParam): Promise<FetchResponse<200, types.GetOwnersCrosscollectionsV1Response200>> {
    return this.core.fetch('/owners/cross-collections/v1', 'get', metadata);
  }

  /**
   * This API can be used to show what the distribution of owners in a collection looks like.
   *
   * @summary Owners Collection Distribution
   */
  getCollectionsCollectionOwnersdistributionV1(metadata: types.GetCollectionsCollectionOwnersdistributionV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionOwnersdistributionV1Response200>> {
    return this.core.fetch('/collections/{collection}/owners-distribution/v1', 'get', metadata);
  }

  /**
   * This API can be used to show what the distribution of owners in a collections set id
   * looks like.
   *
   * @summary Owners Collection Set Distribution
   */
  getCollectionssetsCollectionssetidOwnersdistributionV1(metadata: types.GetCollectionssetsCollectionssetidOwnersdistributionV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionssetsCollectionssetidOwnersdistributionV1Response200>> {
    return this.core.fetch('/collections-sets/{collectionsSetId}/owners-distribution/v1', 'get', metadata);
  }

  /**
   * Get aggregate stats for a particular set (collection, attribute or single token)
   *
   * @summary Stats
   */
  getStatsV2(metadata?: types.GetStatsV2MetadataParam): Promise<FetchResponse<200, types.GetStatsV2Response200>> {
    return this.core.fetch('/stats/v2', 'get', metadata);
  }

  /**
   * Get date, volume, rank and sales count for each collection
   *
   * @summary Daily collection volume
   */
  getCollectionsDailyvolumesV1(metadata: types.GetCollectionsDailyvolumesV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsDailyvolumesV1Response200>> {
    return this.core.fetch('/collections/daily-volumes/v1', 'get', metadata);
  }

  /**
   * This API returns a list of sources
   *
   * @summary Sources List
   */
  getSourcesV1(metadata?: types.GetSourcesV1MetadataParam): Promise<FetchResponse<200, types.GetSourcesV1Response200>> {
    return this.core.fetch('/sources/v1', 'get', metadata);
  }

  /**
   * Get chain mint and sales stats for 1 and 7 days
   *
   * @summary Chain Stats
   */
  getChainStatsV1(): Promise<FetchResponse<200, types.GetChainStatsV1Response200>> {
    return this.core.fetch('/chain/stats/v1', 'get');
  }

  /**
   * Get supported marketplaces
   *
   */
  getAdminGetmarketplaces(): Promise<FetchResponse<200, types.GetAdminGetmarketplacesResponse200>> {
    return this.core.fetch('/admin/get-marketplaces', 'get');
  }

  /**
   * Get swagger json in OpenApi V3
   *
   */
  getAdminOpenapi(): Promise<FetchResponse<number, types.GetAdminOpenapiResponseDefault>> {
    return this.core.fetch('/admin/open-api', 'get');
  }

  /**
   * Get rate limit rules
   *
   */
  getAdminRatelimitrules(metadata: types.GetAdminRatelimitrulesMetadataParam): Promise<FetchResponse<number, types.GetAdminRatelimitrulesResponseDefault>> {
    return this.core.fetch('/admin/rate-limit-rules', 'get', metadata);
  }

  /**
   * Return the asset based on the given param
   *
   */
  getAssetsV1(metadata: types.GetAssetsV1MetadataParam): Promise<FetchResponse<number, types.GetAssetsV1ResponseDefault>> {
    return this.core.fetch('/assets/v1', 'get', metadata);
  }

  /**
   * List of attributes
   *
   */
  getAttributesV1(metadata?: types.GetAttributesV1MetadataParam): Promise<FetchResponse<200, types.GetAttributesV1Response200>> {
    return this.core.fetch('/attributes/v1', 'get', metadata);
  }

  /**
   * Get detailed information about a single collection, including real-time stats.
   *
   * @summary Get detailed information about a single collection
   */
  getCollectionV1(metadata?: types.GetCollectionV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionV1Response200>> {
    return this.core.fetch('/collection/v1', 'get', metadata);
  }

  /**
   * Get detailed information about a single collection, including real-time stats.
   *
   * @summary Single Collection
   */
  getCollectionV2(metadata?: types.GetCollectionV2MetadataParam): Promise<FetchResponse<200, types.GetCollectionV2Response200>> {
    return this.core.fetch('/collection/v2', 'get', metadata);
  }

  /**
   * Get detailed information about a single collection, including real-time stats.
   *
   * @summary Single Collection
   */
  getCollectionV3(metadata?: types.GetCollectionV3MetadataParam): Promise<FetchResponse<200, types.GetCollectionV3Response200>> {
    return this.core.fetch('/collection/v3', 'get', metadata);
  }

  /**
   * Useful for getting multiple collections to show in a marketplace, or search for
   * particular collections.
   *
   * @summary List of collections
   */
  getCollectionsV1(metadata?: types.GetCollectionsV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsV1Response200>> {
    return this.core.fetch('/collections/v1', 'get', metadata);
  }

  /**
   * Useful for getting multiple collections to show in a marketplace, or search for
   * particular collections.
   *
   * @summary Get a filtered list of collections
   */
  getCollectionsV2(metadata?: types.GetCollectionsV2MetadataParam): Promise<FetchResponse<200, types.GetCollectionsV2Response200>> {
    return this.core.fetch('/collections/v2', 'get', metadata);
  }

  /**
   * Useful for getting multiple collections to show in a marketplace, or search for
   * particular collections.
   *
   * @summary Get a filtered list of collections
   */
  getCollectionsV3(metadata?: types.GetCollectionsV3MetadataParam): Promise<FetchResponse<200, types.GetCollectionsV3Response200>> {
    return this.core.fetch('/collections/v3', 'get', metadata);
  }

  /**
   * Useful for getting multiple collections to show in a marketplace, or search for
   * particular collections.
   *
   * @summary Collections
   */
  getCollectionsV4(metadata?: types.GetCollectionsV4MetadataParam): Promise<FetchResponse<200, types.GetCollectionsV4Response200>> {
    return this.core.fetch('/collections/v4', 'get', metadata);
  }

  /**
   * Use this API to explore a collection’s metadata and statistics (sales, volume, etc).
   *
   * @summary Collections
   */
  getCollectionsV5(metadata?: types.GetCollectionsV5MetadataParam): Promise<FetchResponse<200, types.GetCollectionsV5Response200>> {
    return this.core.fetch('/collections/v5', 'get', metadata);
  }

  /**
   * Use this API to explore a collection's metadata and statistics (sales, volume, etc).
   *
   * @summary Collections
   */
  getCollectionsV6(metadata?: types.GetCollectionsV6MetadataParam): Promise<FetchResponse<200, types.GetCollectionsV6Response200>> {
    return this.core.fetch('/collections/v6', 'get', metadata);
  }

  /**
   * This API can be used to check the status of cross posted listings and bids.
   *
   *  Input your `crossPostingOrderId` into the `ids` param and submit for the status. 
   *
   *  The `crossPostingOrderId` is returned in the `execute/bids` and `execute/asks` response
   * as well as the `onProgess` callback for the SDK. 
   *
   *  Note: ReservoirKit does not return a `crossPostingOrderId`.
   *
   * @summary Check Cross Posting Status
   */
  getCrosspostingordersV1(metadata?: types.GetCrosspostingordersV1MetadataParam): Promise<FetchResponse<200, types.GetCrosspostingordersV1Response200>> {
    return this.core.fetch('/cross-posting-orders/v1', 'get', metadata);
  }

  /**
   * Access orders with various filters applied. If you need orders created by a single user,
   * use the positions API instead.
   *
   * @summary List of valid orders.
   */
  getOrdersV1(metadata?: types.GetOrdersV1MetadataParam): Promise<FetchResponse<200, types.GetOrdersV1Response200>> {
    return this.core.fetch('/orders/v1', 'get', metadata);
  }

  /**
   * Submit order batch
   *
   */
  postOrdersV1(body: types.PostOrdersV1BodyParam, metadata: types.PostOrdersV1MetadataParam): Promise<FetchResponse<number, types.PostOrdersV1ResponseDefault>>;
  postOrdersV1(metadata: types.PostOrdersV1MetadataParam): Promise<FetchResponse<number, types.PostOrdersV1ResponseDefault>>;
  postOrdersV1(body?: types.PostOrdersV1BodyParam | types.PostOrdersV1MetadataParam, metadata?: types.PostOrdersV1MetadataParam): Promise<FetchResponse<number, types.PostOrdersV1ResponseDefault>> {
    return this.core.fetch('/orders/v1', 'post', body, metadata);
  }

  /**
   * Access orders with various filters applied. If you need orders created by a single user,
   * use the positions API instead.
   *
   * @summary Submit order batch
   */
  getOrdersV2(metadata?: types.GetOrdersV2MetadataParam): Promise<FetchResponse<200, types.GetOrdersV2Response200>> {
    return this.core.fetch('/orders/v2', 'get', metadata);
  }

  /**
   * Get owners with various filters applied, and a summary of their ownership. Useful for
   * exploring top owners in a collection or attribute.
   *
   * @summary Owners
   */
  getOwnersV1(metadata?: types.GetOwnersV1MetadataParam): Promise<FetchResponse<200, types.GetOwnersV1Response200>> {
    return this.core.fetch('/owners/v1', 'get', metadata);
  }

  /**
   * Get recent sales for a contract or token.
   *
   * @summary Historical sales
   */
  getSalesV1(metadata?: types.GetSalesV1MetadataParam): Promise<FetchResponse<200, types.GetSalesV1Response200>> {
    return this.core.fetch('/sales/v1', 'get', metadata);
  }

  /**
   * Get recent sales for a contract or token.
   *
   * @summary Historical sales
   */
  getSalesV2(metadata?: types.GetSalesV2MetadataParam): Promise<FetchResponse<200, types.GetSalesV2Response200>> {
    return this.core.fetch('/sales/v2', 'get', metadata);
  }

  /**
   * Get recent sales for a contract or token. Note: this API is returns rich metadata, and
   * has advanced filters, so is only designed for small amounts of recent sales. If you want
   * access to sales in bulk, use the `Aggregator > Bulk Sales` API.
   *
   * @summary Historical sales
   */
  getSalesV3(metadata?: types.GetSalesV3MetadataParam): Promise<FetchResponse<200, types.GetSalesV3Response200>> {
    return this.core.fetch('/sales/v3', 'get', metadata);
  }

  /**
   * Get recent sales for a contract or token.
   *
   * @summary Sales
   */
  getSalesV4(metadata?: types.GetSalesV4MetadataParam): Promise<FetchResponse<200, types.GetSalesV4Response200>> {
    return this.core.fetch('/sales/v4', 'get', metadata);
  }

  /**
   * Get recent sales for a contract or token. Paid mints are returned in this `sales`
   * endpoint, free mints can be found in the `/activities/` endpoints. Array of contracts
   * max limit is 20.
   *
   * @summary Sales
   */
  getSalesV5(metadata?: types.GetSalesV5MetadataParam): Promise<FetchResponse<200, types.GetSalesV5Response200>> {
    return this.core.fetch('/sales/v5', 'get', metadata);
  }

  /**
   * Get aggregate stats for a particular set (collection, attribute or single token)
   *
   * @summary Stats
   */
  getStatsV1(metadata?: types.GetStatsV1MetadataParam): Promise<FetchResponse<200, types.GetStatsV1Response200>> {
    return this.core.fetch('/stats/v1', 'get', metadata);
  }

  /**
   * This API is optimized for quickly fetching a list of tokens in a collection, sorted by
   * price, with only the most important information returned. If you need more metadata, use
   * the `tokens/details` API
   *
   * @summary List of tokens
   */
  getTokensV1(metadata?: types.GetTokensV1MetadataParam): Promise<FetchResponse<200, types.GetTokensV1Response200>> {
    return this.core.fetch('/tokens/v1', 'get', metadata);
  }

  /**
   * This API is optimized for quickly fetching a list of tokens in a collection, sorted by
   * price, with only the most important information returned. If you need more metadata, use
   * the `tokens/details` API
   *
   * @summary List of tokens, with basic details, optimized for speed
   */
  getTokensV2(metadata?: types.GetTokensV2MetadataParam): Promise<FetchResponse<200, types.GetTokensV2Response200>> {
    return this.core.fetch('/tokens/v2', 'get', metadata);
  }

  /**
   * This API is optimized for quickly fetching a list of tokens in a collection, sorted by
   * price, with only the most important information returned. If you need more metadata, use
   * the `tokens/details` API
   *
   * @summary List of tokens, with basic details, optimized for speed
   */
  getTokensV3(metadata?: types.GetTokensV3MetadataParam): Promise<FetchResponse<200, types.GetTokensV3Response200>> {
    return this.core.fetch('/tokens/v3', 'get', metadata);
  }

  /**
   * This API is optimized for quickly fetching a list of tokens in a collection, sorted by
   * price, with only the most important information returned. If you need more metadata, use
   * the tokens/details API
   *
   * @summary Tokens
   */
  getTokensV4(metadata?: types.GetTokensV4MetadataParam): Promise<FetchResponse<200, types.GetTokensV4Response200>> {
    return this.core.fetch('/tokens/v4', 'get', metadata);
  }

  /**
   * Get a list of tokens with full metadata. This is useful for showing a single token page,
   * or scenarios that require more metadata.
   *
   * @summary Tokens
   */
  getTokensV5(metadata?: types.GetTokensV5MetadataParam): Promise<FetchResponse<200, types.GetTokensV5Response200>> {
    return this.core.fetch('/tokens/v5', 'get', metadata);
  }

  /**
   * Get a list of tokens with full metadata. This is useful for showing a single token page,
   * or scenarios that require more metadata.
   *
   * @summary Tokens
   */
  getTokensV6(metadata?: types.GetTokensV6MetadataParam): Promise<FetchResponse<200, types.GetTokensV6Response200>> {
    return this.core.fetch('/tokens/v6', 'get', metadata);
  }

  /**
   * Get recent transfers for a contract or token.
   *
   * @summary Historical token transfers
   */
  getTransfersV2(metadata?: types.GetTransfersV2MetadataParam): Promise<FetchResponse<200, types.GetTransfersV2Response200>> {
    return this.core.fetch('/transfers/v2', 'get', metadata);
  }

  /**
   * Get recent transfers for a contract or token.
   *
   * @summary Historical token transfers
   */
  getTransfersV3(metadata?: types.GetTransfersV3MetadataParam): Promise<FetchResponse<200, types.GetTransfersV3Response200>> {
    return this.core.fetch('/transfers/v3', 'get', metadata);
  }

  /**
   * Get the associated info for the given API key
   *
   */
  getAdminGetapikeyKey(metadata: types.GetAdminGetapikeyKeyMetadataParam): Promise<FetchResponse<200, types.GetAdminGetapikeyKeyResponse200>> {
    return this.core.fetch('/admin/get-api-key/{key}', 'get', metadata);
  }

  /**
   * Get metadata for a token or collection
   *
   */
  getAdminProvidermetadataType(metadata: types.GetAdminProvidermetadataTypeMetadataParam): Promise<FetchResponse<number, types.GetAdminProvidermetadataTypeResponseDefault>> {
    return this.core.fetch('/admin/provider-metadata/{type}', 'get', metadata);
  }

  /**
   * Get the rate limits for the given API key. Note: API keys are not universal across all
   * available chains; please make a different key for every chain.
   *
   * @summary Get rate limits for the given API key
   */
  getApikeysKeyRatelimits(metadata: types.GetApikeysKeyRatelimitsMetadataParam): Promise<FetchResponse<200, types.GetApikeysKeyRatelimitsResponse200>> {
    return this.core.fetch('/api-keys/{key}/rate-limits', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a collection
   *
   * @summary Collection activity
   */
  getCollectionsActivityV4(metadata?: types.GetCollectionsActivityV4MetadataParam): Promise<FetchResponse<200, types.GetCollectionsActivityV4Response200>> {
    return this.core.fetch('/collections/activity/v4', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a collection
   *
   * @summary Collection activity
   */
  getCollectionsActivityV5(metadata?: types.GetCollectionsActivityV5MetadataParam): Promise<FetchResponse<200, types.GetCollectionsActivityV5Response200>> {
    return this.core.fetch('/collections/activity/v5', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a collection including sales, asks, transfers,
   * mints, bids, cancelled bids, and cancelled asks types.
   *
   * @summary Collection activity
   */
  getCollectionsActivityV7(metadata?: types.GetCollectionsActivityV7MetadataParam): Promise<FetchResponse<200, types.GetCollectionsActivityV7Response200>> {
    return this.core.fetch('/collections/activity/v7', 'get', metadata);
  }

  /**
   * Get top selling and minting collections
   *
   * @summary Top Selling Collections
   */
  getCollectionsTopsellingV1(metadata?: types.GetCollectionsTopsellingV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsTopsellingV1Response200>> {
    return this.core.fetch('/collections/top-selling/v1', 'get', metadata);
  }

  /**
   * Get top selling and minting collections
   *
   * @summary Top selling collections
   */
  getCollectionsTopsellingV2(metadata?: types.GetCollectionsTopsellingV2MetadataParam): Promise<FetchResponse<200, types.GetCollectionsTopsellingV2Response200>> {
    return this.core.fetch('/collections/top-selling/v2', 'get', metadata);
  }

  /**
   * Get detailed information about a single collection, including real-time stats.
   *
   * @summary Single collection
   */
  getCollectionsCollectionorslugV1(metadata: types.GetCollectionsCollectionorslugV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionorslugV1Response200>> {
    return this.core.fetch('/collections/{collectionOrSlug}/v1', 'get', metadata);
  }

  /**
   * Convert an amount in one currency to another
   *
   * @summary Currency Conversions
   */
  getCurrenciesConversionV1(metadata?: types.GetCurrenciesConversionV1MetadataParam): Promise<FetchResponse<200, types.GetCurrenciesConversionV1Response200>> {
    return this.core.fetch('/currencies/conversion/v1', 'get', metadata);
  }

  /**
   * Get updates any time an asks status changes
   *
   * @summary Asks status changes
   */
  getEventsAsksV2(metadata?: types.GetEventsAsksV2MetadataParam): Promise<FetchResponse<200, types.GetEventsAsksV2Response200>> {
    return this.core.fetch('/events/asks/v2', 'get', metadata);
  }

  /**
   * Get updates any time a bid status changes
   *
   * @summary Bid status changes
   */
  getEventsBidsV1(metadata?: types.GetEventsBidsV1MetadataParam): Promise<FetchResponse<200, types.GetEventsBidsV1Response200>> {
    return this.core.fetch('/events/bids/v1', 'get', metadata);
  }

  /**
   * Get updates any time a bid status changes
   *
   * @summary Bid status changes
   */
  getEventsBidsV2(metadata?: types.GetEventsBidsV2MetadataParam): Promise<FetchResponse<200, types.GetEventsBidsV2Response200>> {
    return this.core.fetch('/events/bids/v2', 'get', metadata);
  }

  /**
   * Get updates any time an order status changes
   *
   * @summary Order status changes
   */
  getEventsOrdersV1(metadata?: types.GetEventsOrdersV1MetadataParam): Promise<FetchResponse<200, types.GetEventsOrdersV1Response200>> {
    return this.core.fetch('/events/orders/v1', 'get', metadata);
  }

  /**
   * Cancel an existing order on any marketplace
   *
   * @summary Cancel order
   */
  getExecuteCancelV2(metadata: types.GetExecuteCancelV2MetadataParam): Promise<FetchResponse<200, types.GetExecuteCancelV2Response200>> {
    return this.core.fetch('/execute/cancel/v2', 'get', metadata);
  }

  /**
   * This API calculates the total liquidity created by users, based on the number of tokens
   * they are top bidder for.
   *
   * @summary User bid liquidity rankings
   */
  getLiquidityUsersV1(metadata?: types.GetLiquidityUsersV1MetadataParam): Promise<FetchResponse<200, types.GetLiquidityUsersV1Response200>> {
    return this.core.fetch('/liquidity/users/v1', 'get', metadata);
  }

  /**
   * This API calculates the total liquidity created by users, based on the number of tokens
   * they are top bidder for.
   *
   * @summary User bid liquidity rankings
   */
  getLiquidityUsersV2(metadata: types.GetLiquidityUsersV2MetadataParam): Promise<FetchResponse<200, types.GetLiquidityUsersV2Response200>> {
    return this.core.fetch('/liquidity/users/v2', 'get', metadata);
  }

  /**
   * This API is designed for efficiently ingesting large volumes of orders, for external
   * processing
   *
   * @summary Bulk historical orders
   */
  getOrdersAllV1(metadata?: types.GetOrdersAllV1MetadataParam): Promise<FetchResponse<200, types.GetOrdersAllV1Response200>> {
    return this.core.fetch('/orders/all/v1', 'get', metadata);
  }

  /**
   * This API is designed for efficiently ingesting large volumes of orders, for external
   * processing
   *
   * @summary Bulk historical orders
   */
  getOrdersAllV2(metadata?: types.GetOrdersAllV2MetadataParam): Promise<FetchResponse<200, types.GetOrdersAllV2Response200>> {
    return this.core.fetch('/orders/all/v2', 'get', metadata);
  }

  /**
   * This API is designed for efficiently ingesting large volumes of orders, for external
   * processing
   *
   * @summary Get a list of asks (listings), filtered by token, collection or maker
   */
  getOrdersAsksV1(metadata?: types.GetOrdersAsksV1MetadataParam): Promise<FetchResponse<200, types.GetOrdersAsksV1Response200>> {
    return this.core.fetch('/orders/asks/v1', 'get', metadata);
  }

  /**
   * Get a list of asks (listings), filtered by token, collection or maker. This API is
   * designed for efficiently ingesting large volumes of orders, for external processing
   *
   * @summary Asks (listings)
   */
  getOrdersAsksV2(metadata?: types.GetOrdersAsksV2MetadataParam): Promise<FetchResponse<200, types.GetOrdersAsksV2Response200>> {
    return this.core.fetch('/orders/asks/v2', 'get', metadata);
  }

  /**
   * Get a list of asks (listings), filtered by token, collection or maker. This API is
   * designed for efficiently ingesting large volumes of orders, for external processing
   *
   * @summary Asks (listings)
   */
  getOrdersAsksV3(metadata?: types.GetOrdersAsksV3MetadataParam): Promise<FetchResponse<200, types.GetOrdersAsksV3Response200>> {
    return this.core.fetch('/orders/asks/v3', 'get', metadata);
  }

  /**
   * Get a list of asks (listings), filtered by token, collection or maker. This API is
   * designed for efficiently ingesting large volumes of orders, for external processing.
   *
   *  Please mark `excludeEOA` as `true` to exclude Blur orders.
   *
   * @summary Asks (listings)
   */
  getOrdersAsksV4(metadata?: types.GetOrdersAsksV4MetadataParam): Promise<FetchResponse<200, types.GetOrdersAsksV4Response200>> {
    return this.core.fetch('/orders/asks/v4', 'get', metadata);
  }

  /**
   * This API is designed for efficiently ingesting large volumes of orders, for external
   * processing
   *
   * @summary Get a list of bids (offers), filtered by token, collection or maker
   */
  getOrdersBidsV1(metadata?: types.GetOrdersBidsV1MetadataParam): Promise<FetchResponse<200, types.GetOrdersBidsV1Response200>> {
    return this.core.fetch('/orders/bids/v1', 'get', metadata);
  }

  /**
   * Get a list of bids (offers), filtered by token, collection or maker. This API is
   * designed for efficiently ingesting large volumes of orders, for external processing
   *
   * @summary Bids (offers)
   */
  getOrdersBidsV2(metadata?: types.GetOrdersBidsV2MetadataParam): Promise<FetchResponse<200, types.GetOrdersBidsV2Response200>> {
    return this.core.fetch('/orders/bids/v2', 'get', metadata);
  }

  /**
   * Get a list of bids (offers), filtered by token, collection or maker. This API is
   * designed for efficiently ingesting large volumes of orders, for external processing
   *
   * @summary Bids (offers)
   */
  getOrdersBidsV3(metadata?: types.GetOrdersBidsV3MetadataParam): Promise<FetchResponse<200, types.GetOrdersBidsV3Response200>> {
    return this.core.fetch('/orders/bids/v3', 'get', metadata);
  }

  /**
   * Get a list of bids (offers), filtered by token, collection or maker. This API is
   * designed for efficiently ingesting large volumes of orders, for external processing
   *
   * @summary Bids (offers)
   */
  getOrdersBidsV4(metadata?: types.GetOrdersBidsV4MetadataParam): Promise<FetchResponse<200, types.GetOrdersBidsV4Response200>> {
    return this.core.fetch('/orders/bids/v4', 'get', metadata);
  }

  /**
   * Get a list of bids (offers), filtered by token, collection or maker. This API is
   * designed for efficiently ingesting large volumes of orders, for external processing.
   *
   *  There are a different kind of bids than can be returned:
   *
   * - Inputting a 'contract' will return token and attribute bids.
   *
   * - Inputting a 'collection-id' will return collection wide bids./n/n Please mark
   * `excludeEOA` as `true` to exclude Blur orders.
   *
   * @summary Bids (offers)
   */
  getOrdersBidsV5(metadata?: types.GetOrdersBidsV5MetadataParam): Promise<FetchResponse<200, types.GetOrdersBidsV5Response200>> {
    return this.core.fetch('/orders/bids/v5', 'get', metadata);
  }

  /**
   * Order status
   *
   */
  getOrdersExecutedV1(metadata: types.GetOrdersExecutedV1MetadataParam): Promise<FetchResponse<number, types.GetOrdersExecutedV1ResponseDefault>> {
    return this.core.fetch('/orders/executed/v1', 'get', metadata);
  }

  /**
   * Get tokens which have a pending sale transaction
   *
   * @summary Pending tokens
   */
  getPendingtxsTokensV1(metadata?: types.GetPendingtxsTokensV1MetadataParam): Promise<FetchResponse<200, types.GetPendingtxsTokensV1Response200>> {
    return this.core.fetch('/pending-txs/tokens/v1', 'get', metadata);
  }

  /**
   * Redirect response to the given source logo
   *
   */
  getRedirectLogoV1(metadata: types.GetRedirectLogoV1MetadataParam): Promise<FetchResponse<number, types.GetRedirectLogoV1ResponseDefault>> {
    return this.core.fetch('/redirect/logo/v1', 'get', metadata);
  }

  /**
   * Redirect response to the given source token page
   *
   */
  getRedirectTokenV1(metadata: types.GetRedirectTokenV1MetadataParam): Promise<FetchResponse<number, types.GetRedirectTokenV1ResponseDefault>> {
    return this.core.fetch('/redirect/token/v1', 'get', metadata);
  }

  /**
   * Note: this API is optimized for bulk access, and offers minimal filters/metadata. If you
   * need more flexibility, try the `NFT API > Sales` endpoint
   *
   * @summary Bulk historical sales
   */
  getSalesBulkV1(metadata?: types.GetSalesBulkV1MetadataParam): Promise<FetchResponse<200, types.GetSalesBulkV1Response200>> {
    return this.core.fetch('/sales/bulk/v1', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a collection including sales, asks, transfers,
   * mints, bids, cancelled bids, and cancelled asks types.
   *
   * @summary Search activity
   */
  getSearchActivitiesV1(metadata?: types.GetSearchActivitiesV1MetadataParam): Promise<FetchResponse<200, types.GetSearchActivitiesV1Response200>> {
    return this.core.fetch('/search/activities/v1', 'get', metadata);
  }

  /**
   * Search collections
   *
   */
  getSearchCollectionsV1(metadata?: types.GetSearchCollectionsV1MetadataParam): Promise<FetchResponse<200, types.GetSearchCollectionsV1Response200>> {
    return this.core.fetch('/search/collections/v1', 'get', metadata);
  }

  /**
   * Search Collections
   *
   */
  getSearchCollectionsV3(metadata?: types.GetSearchCollectionsV3MetadataParam): Promise<FetchResponse<200, types.GetSearchCollectionsV3Response200>> {
    return this.core.fetch('/search/collections/v3', 'get', metadata);
  }

  /**
   * This API is optimized for bulk access to asks (listings) for syncing a remote database.
   * Thus it offers minimal filters/metadata.
   *
   * @summary Sync Asks (listings)
   */
  getSyncAsksV1(metadata?: types.GetSyncAsksV1MetadataParam): Promise<FetchResponse<200, types.GetSyncAsksV1Response200>> {
    return this.core.fetch('/sync/asks/v1', 'get', metadata);
  }

  /**
   * Get a list of tokens with full metadata. This is useful for showing a single token page,
   * or scenarios that require more metadata. If you don't need this metadata, you should use
   * the <a href='#/tokens/getTokensV1'>tokens</a> API, which is much faster.
   *
   * @summary Get one or more tokens with full details
   */
  getTokensDetailsV2(metadata?: types.GetTokensDetailsV2MetadataParam): Promise<FetchResponse<200, types.GetTokensDetailsV2Response200>> {
    return this.core.fetch('/tokens/details/v2', 'get', metadata);
  }

  /**
   * Get a list of tokens with full metadata. This is useful for showing a single token page,
   * or scenarios that require more metadata. If you don't need this metadata, you should use
   * the <a href='#/tokens/getTokensV1'>tokens</a> API, which is much faster.
   *
   * @summary Get one or more tokens with full details
   */
  getTokensDetailsV3(metadata?: types.GetTokensDetailsV3MetadataParam): Promise<FetchResponse<200, types.GetTokensDetailsV3Response200>> {
    return this.core.fetch('/tokens/details/v3', 'get', metadata);
  }

  /**
   * Get a list of tokens with full metadata. This is useful for showing a single token page,
   * or scenarios that require more metadata. If you don't need this metadata, you should use
   * the <a href='#/tokens/getTokensV1'>tokens</a> API, which is much faster.
   *
   * @summary Tokens (detailed response)
   */
  getTokensDetailsV4(metadata?: types.GetTokensDetailsV4MetadataParam): Promise<FetchResponse<200, types.GetTokensDetailsV4Response200>> {
    return this.core.fetch('/tokens/details/v4', 'get', metadata);
  }

  /**
   * Note: this API is optimized for bulk access, and offers minimal filters/metadata. If you
   * need more flexibility, try the `NFT API > Transfers` endpoint
   *
   * @summary Bulk historical transfers
   */
  getTransfersBulkV1(metadata?: types.GetTransfersBulkV1MetadataParam): Promise<FetchResponse<200, types.GetTransfersBulkV1Response200>> {
    return this.core.fetch('/transfers/bulk/v1', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a user
   *
   * @summary Users activity
   */
  getUsersActivityV2(metadata: types.GetUsersActivityV2MetadataParam): Promise<FetchResponse<200, types.GetUsersActivityV2Response200>> {
    return this.core.fetch('/users/activity/v2', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a user
   *
   * @summary Users activity
   */
  getUsersActivityV3(metadata: types.GetUsersActivityV3MetadataParam): Promise<FetchResponse<200, types.GetUsersActivityV3Response200>> {
    return this.core.fetch('/users/activity/v3', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a user
   *
   * @summary Users activity
   */
  getUsersActivityV4(metadata: types.GetUsersActivityV4MetadataParam): Promise<FetchResponse<200, types.GetUsersActivityV4Response200>> {
    return this.core.fetch('/users/activity/v4', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a user
   *
   * @summary Users activity
   */
  getUsersActivityV5(metadata: types.GetUsersActivityV5MetadataParam): Promise<FetchResponse<200, types.GetUsersActivityV5Response200>> {
    return this.core.fetch('/users/activity/v5', 'get', metadata);
  }

  /**
   * This API returns recommended marketplace configurations given a collection id
   *
   * @summary Marketplace configurations by collection
   */
  getCollectionsCollectionMarketplaceconfigurationsV1(metadata: types.GetCollectionsCollectionMarketplaceconfigurationsV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionMarketplaceconfigurationsV1Response200>> {
    return this.core.fetch('/collections/{collection}/marketplace-configurations/v1', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a collection
   *
   * @summary Collection activity
   */
  getCollectionsCollectionActivityV2(metadata: types.GetCollectionsCollectionActivityV2MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionActivityV2Response200>> {
    return this.core.fetch('/collections/{collection}/activity/v2', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a collection
   *
   * @summary Collection activity
   */
  getCollectionsCollectionActivityV1(metadata: types.GetCollectionsCollectionActivityV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionActivityV1Response200>> {
    return this.core.fetch('/collections/{collection}/activity/v1', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a collection
   *
   * @summary Collection activity
   */
  getCollectionsCollectionActivityV3(metadata: types.GetCollectionsCollectionActivityV3MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionActivityV3Response200>> {
    return this.core.fetch('/collections/{collection}/activity/v3', 'get', metadata);
  }

  /**
   * Get detailed aggregate about attributes in a collection, e.g. trait floors
   *
   */
  getCollectionsCollectionAttributesV1(metadata: types.GetCollectionsCollectionAttributesV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesV1Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/v1', 'get', metadata);
  }

  /**
   * When users are placing collection or trait bids, this API can be used to show them where
   * the bid is in the context of other bids, and how many tokens it will be the top bid for.
   *
   * @summary Bid distribution
   */
  getCollectionsCollectionTopbidsV1(metadata: types.GetCollectionsCollectionTopbidsV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionTopbidsV1Response200>> {
    return this.core.fetch('/collections/{collection}/top-bids/v1', 'get', metadata);
  }

  /**
   * The ReservoirKit `ListModal` client utilizes this API to identify the marketplace(s) it
   * can list on.
   *
   * @summary Supported marketplaces by collection
   */
  getCollectionsCollectionSupportedmarketplacesV1(metadata: types.GetCollectionsCollectionSupportedmarketplacesV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionSupportedmarketplacesV1Response200>> {
    return this.core.fetch('/collections/{collection}/supported-marketplaces/v1', 'get', metadata);
  }

  /**
   * Every time the floor price of a collection changes (i.e. the 'floor ask'), an event is
   * generated. This API is designed to be polled at high frequency, in order to keep an
   * external system in sync with accurate prices for any token.
   *
   * There are multiple event types, which describe what caused the change in price:
   *
   * - `new-order` > new listing at a lower price
   *
   * - `expiry` > the previous best listing expired
   *
   * - `sale` > the previous best listing was filled
   *
   * - `cancel` > the previous best listing was cancelled
   *
   * - `balance-change` > the best listing was invalidated due to no longer owning the NFT
   *
   * - `approval-change` > the best listing was invalidated due to revoked approval
   *
   * - `revalidation` > manual revalidation of orders (e.g. after a bug fixed)
   *
   * - `reprice` > price update for dynamic orders (e.g. dutch auctions)
   *
   * - `bootstrap` > initial loading of data, so that all tokens have a price associated
   *
   * Some considerations to keep in mind
   *
   * - Due to the complex nature of monitoring off-chain liquidity across multiple
   * marketplaces, including dealing with block re-orgs, events should be considered
   * 'relative' to the perspective of the indexer, ie _when they were discovered_, rather
   * than _when they happened_. A more deterministic historical record of price changes is in
   * development, but in the meantime, this method is sufficent for keeping an external
   * system in sync with the best available prices.
   *
   * - Events are only generated if the best price changes. So if a new order or sale happens
   * without changing the best price, no event is generated. This is more common with 1155
   * tokens, which have multiple owners and more depth. For this reason, if you need sales
   * data, use the Sales API.
   *
   * @summary Collection floor changes
   */
  getEventsCollectionsFlooraskV1(metadata?: types.GetEventsCollectionsFlooraskV1MetadataParam): Promise<FetchResponse<200, types.GetEventsCollectionsFlooraskV1Response200>> {
    return this.core.fetch('/events/collections/floor-ask/v1', 'get', metadata);
  }

  /**
   * Every time the top offer of a collection changes (i.e. the 'top bid'), an event is
   * generated. This API is designed to be polled at high frequency.
   *
   * @summary Collection top bid changes
   */
  getEventsCollectionsTopbidV1(metadata?: types.GetEventsCollectionsTopbidV1MetadataParam): Promise<FetchResponse<200, types.GetEventsCollectionsTopbidV1Response200>> {
    return this.core.fetch('/events/collections/top-bid/v1', 'get', metadata);
  }

  /**
   * Every time the best price of a token changes (i.e. the 'floor ask'), an event is
   * generated. This API is designed to be polled at high frequency, in order to keep an
   * external system in sync with accurate prices for any token.
   *
   * There are multiple event types, which describe what caused the change in price:
   *
   * - `new-order` > new listing at a lower price
   *
   * - `expiry` > the previous best listing expired
   *
   * - `sale` > the previous best listing was filled
   *
   * - `cancel` > the previous best listing was cancelled
   *
   * - `balance-change` > the best listing was invalidated due to no longer owning the NFT
   *
   * - `approval-change` > the best listing was invalidated due to revoked approval
   *
   * - `revalidation` > manual revalidation of orders (e.g. after a bug fixed)
   *
   * - `reprice` > price update for dynamic orders (e.g. dutch auctions)
   *
   * - `bootstrap` > initial loading of data, so that all tokens have a price associated
   *
   * Some considerations to keep in mind
   *
   * - Due to the complex nature of monitoring off-chain liquidity across multiple
   * marketplaces, including dealing with block re-orgs, events should be considered
   * 'relative' to the perspective of the indexer, ie _when they were discovered_, rather
   * than _when they happened_. A more deterministic historical record of price changes is in
   * development, but in the meantime, this method is sufficent for keeping an external
   * system in sync with the best available prices.
   *
   * - Events are only generated if the best price changes. So if a new order or sale happens
   * without changing the best price, no event is generated. This is more common with 1155
   * tokens, which have multiple owners and more depth. For this reason, if you need sales
   * data, use the Sales API.
   *
   * @summary Token price changes
   */
  getEventsTokensFlooraskV2(metadata?: types.GetEventsTokensFlooraskV2MetadataParam): Promise<FetchResponse<200, types.GetEventsTokensFlooraskV2Response200>> {
    return this.core.fetch('/events/tokens/floor-ask/v2', 'get', metadata);
  }

  /**
   * Every time the best price of a token changes (i.e. the 'floor ask'), an event is
   * generated. This API is designed to be polled at high frequency, in order to keep an
   * external system in sync with accurate prices for any token.
   *
   * There are multiple event types, which describe what caused the change in price:
   *
   * - `new-order` > new listing at a lower price
   *
   * - `expiry` > the previous best listing expired
   *
   * - `sale` > the previous best listing was filled
   *
   * - `cancel` > the previous best listing was cancelled
   *
   * - `balance-change` > the best listing was invalidated due to no longer owning the NFT
   *
   * - `approval-change` > the best listing was invalidated due to revoked approval
   *
   * - `revalidation` > manual revalidation of orders (e.g. after a bug fixed)
   *
   * - `reprice` > price update for dynamic orders (e.g. dutch auctions)
   *
   * - `bootstrap` > initial loading of data, so that all tokens have a price associated
   *
   * Some considerations to keep in mind
   *
   * - Due to the complex nature of monitoring off-chain liquidity across multiple
   * marketplaces, including dealing with block re-orgs, events should be considered
   * 'relative' to the perspective of the indexer, ie _when they were discovered_, rather
   * than _when they happened_. A more deterministic historical record of price changes is in
   * development, but in the meantime, this method is sufficent for keeping an external
   * system in sync with the best available prices.
   *
   * - Events are only generated if the best price changes. So if a new order or sale happens
   * without changing the best price, no event is generated. This is more common with 1155
   * tokens, which have multiple owners and more depth. For this reason, if you need sales
   * data, use the Sales API.
   *
   * @summary Token price changes
   */
  getEventsTokensFlooraskV3(metadata?: types.GetEventsTokensFlooraskV3MetadataParam): Promise<FetchResponse<200, types.GetEventsTokensFlooraskV3Response200>> {
    return this.core.fetch('/events/tokens/floor-ask/v3', 'get', metadata);
  }

  /**
   * Get a signed message of any collection's bid-ask midpoint (spot or twap). This is
   * approximation of the colletion price. The oracle's address is
   * 0xAeB1D03929bF87F69888f381e73FBf75753d75AF. The address is the same for all chains.
   *
   * @summary Collection bid-ask midpoint
   */
  getOracleCollectionsBidaskmidpointV1(metadata?: types.GetOracleCollectionsBidaskmidpointV1MetadataParam): Promise<FetchResponse<200, types.GetOracleCollectionsBidaskmidpointV1Response200>> {
    return this.core.fetch('/oracle/collections/bid-ask-midpoint/v1', 'get', metadata);
  }

  /**
   * Get a signed message of any collection's floor price (spot or twap). The oracle's
   * address is 0x32dA57E736E05f75aa4FaE2E9Be60FD904492726.
   *
   * @summary Collection floor
   */
  getOracleCollectionsFlooraskV4(metadata?: types.GetOracleCollectionsFlooraskV4MetadataParam): Promise<FetchResponse<200, types.GetOracleCollectionsFlooraskV4Response200>> {
    return this.core.fetch('/oracle/collections/floor-ask/v4', 'get', metadata);
  }

  /**
   * Get a signed message of any collection's floor price (spot or twap). The oracle's
   * address is 0xAeB1D03929bF87F69888f381e73FBf75753d75AF. The address is the same for all
   * chains.
   *
   * @summary Collection floor
   */
  getOracleCollectionsFlooraskV5(metadata?: types.GetOracleCollectionsFlooraskV5MetadataParam): Promise<FetchResponse<200, types.GetOracleCollectionsFlooraskV5Response200>> {
    return this.core.fetch('/oracle/collections/floor-ask/v5', 'get', metadata);
  }

  /**
   * Get a signed message of any collection's floor price (spot or twap). The oracle's
   * address is 0xAeB1D03929bF87F69888f381e73FBf75753d75AF. The address is the same for all
   * chains.
   *
   * @summary Collection floor
   */
  getOracleCollectionsFlooraskV6(metadata?: types.GetOracleCollectionsFlooraskV6MetadataParam): Promise<FetchResponse<200, types.GetOracleCollectionsFlooraskV6Response200>> {
    return this.core.fetch('/oracle/collections/floor-ask/v6', 'get', metadata);
  }

  /**
   * Get a signed message of any collection's top bid price (spot or twap). The oracle's
   * address is 0xAeB1D03929bF87F69888f381e73FBf75753d75AF. The address is the same for all
   * chains.
   *
   * @summary Collection top bid oracle
   */
  getOracleCollectionsTopbidV2(metadata?: types.GetOracleCollectionsTopbidV2MetadataParam): Promise<FetchResponse<200, types.GetOracleCollectionsTopbidV2Response200>> {
    return this.core.fetch('/oracle/collections/top-bid/v2', 'get', metadata);
  }

  /**
   * Get a signed message of any collection's top bid price (spot or twap). The oracle's
   * address is 0xAeB1D03929bF87F69888f381e73FBf75753d75AF. The address is the same for all
   * chains.
   *
   * @summary Collection top bid oracle
   */
  getOracleCollectionsTopbidV3(metadata?: types.GetOracleCollectionsTopbidV3MetadataParam): Promise<FetchResponse<200, types.GetOracleCollectionsTopbidV3Response200>> {
    return this.core.fetch('/oracle/collections/top-bid/v3', 'get', metadata);
  }

  /**
   * Get a signed message of a token's details (flagged status and last transfer time). The
   * oracle's address is 0xAeB1D03929bF87F69888f381e73FBf75753d75AF. The address is the same
   * for all chains.
   *
   * @summary Token status oracle
   */
  getOracleTokensStatusV2(metadata: types.GetOracleTokensStatusV2MetadataParam): Promise<FetchResponse<200, types.GetOracleTokensStatusV2Response200>> {
    return this.core.fetch('/oracle/tokens/status/v2', 'get', metadata);
  }

  /**
   * Get a signed message of a token's details (flagged status and last transfer time). The
   * oracle's address is 0xAeB1D03929bF87F69888f381e73FBf75753d75AF. The address is the same
   * for all chains.
   *
   * @summary Token status oracle
   */
  getOracleTokensStatusV3(metadata: types.GetOracleTokensStatusV3MetadataParam): Promise<FetchResponse<200, types.GetOracleTokensStatusV3Response200>> {
    return this.core.fetch('/oracle/tokens/status/v3', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a token
   *
   * @summary Token activity
   */
  getTokensTokenActivityV3(metadata: types.GetTokensTokenActivityV3MetadataParam): Promise<FetchResponse<200, types.GetTokensTokenActivityV3Response200>> {
    return this.core.fetch('/tokens/{token}/activity/v3', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a token
   *
   * @summary Token activity
   */
  getTokensTokenActivityV1(metadata: types.GetTokensTokenActivityV1MetadataParam): Promise<FetchResponse<200, types.GetTokensTokenActivityV1Response200>> {
    return this.core.fetch('/tokens/{token}/activity/v1', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a token
   *
   * @summary Token activity
   */
  getTokensTokenActivityV2(metadata: types.GetTokensTokenActivityV2MetadataParam): Promise<FetchResponse<200, types.GetTokensTokenActivityV2Response200>> {
    return this.core.fetch('/tokens/{token}/activity/v2', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a token
   *
   * @summary Token activity
   */
  getTokensTokenActivityV4(metadata: types.GetTokensTokenActivityV4MetadataParam): Promise<FetchResponse<200, types.GetTokensTokenActivityV4Response200>> {
    return this.core.fetch('/tokens/{token}/activity/v4', 'get', metadata);
  }

  /**
   * Get a boolean response on whether a particular transaction was synced or not.
   *
   * @summary Check Transaction Status
   */
  getTransactionsTxhashSyncedV1(metadata: types.GetTransactionsTxhashSyncedV1MetadataParam): Promise<FetchResponse<200, types.GetTransactionsTxhashSyncedV1Response200>> {
    return this.core.fetch('/transactions/{txHash}/synced/v1', 'get', metadata);
  }

  /**
   * Get tokens held by a user, along with ownership information such as associated orders
   * and date acquired.
   *
   * @summary User Tokens
   */
  getUsersUserTokensV10(metadata: types.GetUsersUserTokensV10MetadataParam): Promise<FetchResponse<200, types.GetUsersUserTokensV10Response200>> {
    return this.core.fetch('/users/{user}/tokens/v10', 'get', metadata);
  }

  /**
   * Get tokens held by a user, along with ownership information such as associated orders
   * and date acquired.
   *
   * @summary User Tokens
   */
  getUsersUserTokensV8(metadata: types.GetUsersUserTokensV8MetadataParam): Promise<FetchResponse<200, types.GetUsersUserTokensV8Response200>> {
    return this.core.fetch('/users/{user}/tokens/v8', 'get', metadata);
  }

  /**
   * Get tokens held by a user, along with ownership information such as associated orders
   * and date acquired.
   *
   * @summary User Tokens
   */
  getUsersUserTokensV6(metadata: types.GetUsersUserTokensV6MetadataParam): Promise<FetchResponse<200, types.GetUsersUserTokensV6Response200>> {
    return this.core.fetch('/users/{user}/tokens/v6', 'get', metadata);
  }

  /**
   * Get tokens held by a user, along with ownership information such as associated orders
   * and date acquired.
   *
   * @summary User Tokens
   */
  getUsersUserTokensV4(metadata: types.GetUsersUserTokensV4MetadataParam): Promise<FetchResponse<200, types.GetUsersUserTokensV4Response200>> {
    return this.core.fetch('/users/{user}/tokens/v4', 'get', metadata);
  }

  /**
   * Get tokens held by a user, along with ownership information such as associated orders
   * and date acquired.
   *
   * @summary User tokens
   */
  getUsersUserTokensV2(metadata: types.GetUsersUserTokensV2MetadataParam): Promise<FetchResponse<200, types.GetUsersUserTokensV2Response200>> {
    return this.core.fetch('/users/{user}/tokens/v2', 'get', metadata);
  }

  /**
   * Get a list of bids (offers), filtered by maker.
   *
   * @summary User Bids (offers)
   */
  getUsersUserBidsV1(metadata: types.GetUsersUserBidsV1MetadataParam): Promise<FetchResponse<200, types.GetUsersUserBidsV1Response200>> {
    return this.core.fetch('/users/{user}/bids/v1', 'get', metadata);
  }

  /**
   * Get aggregate user liquidity, grouped by collection. Useful for showing a summary of
   * liquidity being provided (orders made).
   *
   * @summary Get a summary of a users bids and asks
   */
  getUsersUserPositionsV1(metadata: types.GetUsersUserPositionsV1MetadataParam): Promise<FetchResponse<200, types.GetUsersUserPositionsV1Response200>> {
    return this.core.fetch('/users/{user}/positions/v1', 'get', metadata);
  }

  /**
   * Get aggregate stats for a user, grouped by collection. Useful for showing total
   * portfolio information.
   *
   * @summary User collections
   */
  getUsersUserCollectionsV3(metadata: types.GetUsersUserCollectionsV3MetadataParam): Promise<FetchResponse<200, types.GetUsersUserCollectionsV3Response200>> {
    return this.core.fetch('/users/{user}/collections/v3', 'get', metadata);
  }

  /**
   * Get aggregate stats for a user, grouped by collection. Useful for showing total
   * portfolio information.
   *
   * @summary Get aggregate stats for a user, grouped by collection
   */
  getUsersUserCollectionsV1(metadata: types.GetUsersUserCollectionsV1MetadataParam): Promise<FetchResponse<200, types.GetUsersUserCollectionsV1Response200>> {
    return this.core.fetch('/users/{user}/collections/v1', 'get', metadata);
  }

  /**
   * This API can be used to build a feed for a user
   *
   * @summary User activity
   */
  getUsersUserActivityV1(metadata: types.GetUsersUserActivityV1MetadataParam): Promise<FetchResponse<200, types.GetUsersUserActivityV1Response200>> {
    return this.core.fetch('/users/{user}/activity/v1', 'get', metadata);
  }

  /**
   * Get aggregate stats for a user, grouped by collection. Useful for showing total
   * portfolio information.
   *
   * @summary User collections
   */
  getUsersUserCollectionsV2(metadata: types.GetUsersUserCollectionsV2MetadataParam): Promise<FetchResponse<200, types.GetUsersUserCollectionsV2Response200>> {
    return this.core.fetch('/users/{user}/collections/v2', 'get', metadata);
  }

  /**
   * Get aggregate stats for a user, grouped by collection. Useful for showing total
   * portfolio information.
   *
   * @summary User collections
   */
  getUsersUserCollectionsV4(metadata: types.GetUsersUserCollectionsV4MetadataParam): Promise<FetchResponse<200, types.GetUsersUserCollectionsV4Response200>> {
    return this.core.fetch('/users/{user}/collections/v4', 'get', metadata);
  }

  /**
   * Get tokens held by a user, along with ownership information such as associated orders
   * and date acquired.
   *
   * @summary User tokens
   */
  getUsersUserTokensV1(metadata: types.GetUsersUserTokensV1MetadataParam): Promise<FetchResponse<200, types.GetUsersUserTokensV1Response200>> {
    return this.core.fetch('/users/{user}/tokens/v1', 'get', metadata);
  }

  /**
   * Get tokens held by a user, along with ownership information such as associated orders
   * and date acquired.
   *
   * @summary User Tokens
   */
  getUsersUserTokensV3(metadata: types.GetUsersUserTokensV3MetadataParam): Promise<FetchResponse<200, types.GetUsersUserTokensV3Response200>> {
    return this.core.fetch('/users/{user}/tokens/v3', 'get', metadata);
  }

  /**
   * Get tokens held by a user, along with ownership information such as associated orders
   * and date acquired.
   *
   * @summary User Tokens
   */
  getUsersUserTokensV5(metadata: types.GetUsersUserTokensV5MetadataParam): Promise<FetchResponse<200, types.GetUsersUserTokensV5Response200>> {
    return this.core.fetch('/users/{user}/tokens/v5', 'get', metadata);
  }

  /**
   * Get tokens held by a user, along with ownership information such as associated orders
   * and date acquired.
   *
   * @summary User Tokens
   */
  getUsersUserTokensV7(metadata: types.GetUsersUserTokensV7MetadataParam): Promise<FetchResponse<200, types.GetUsersUserTokensV7Response200>> {
    return this.core.fetch('/users/{user}/tokens/v7', 'get', metadata);
  }

  /**
   * Get tokens held by a user, along with ownership information such as associated orders
   * and date acquired.
   *
   * @summary User Tokens
   */
  getUsersUserTokensV9(metadata: types.GetUsersUserTokensV9MetadataParam): Promise<FetchResponse<200, types.GetUsersUserTokensV9Response200>> {
    return this.core.fetch('/users/{user}/tokens/v9', 'get', metadata);
  }

  /**
   * Get detailed aggregate about attributes in a collection, attribute floors
   *
   * @summary Explore attributes
   */
  getCollectionsCollectionAttributesExploreV3(metadata: types.GetCollectionsCollectionAttributesExploreV3MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesExploreV3Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/explore/v3', 'get', metadata);
  }

  /**
   * Get detailed aggregate about attributes in a collection, e.g. trait floors
   *
   */
  getCollectionsCollectionAttributesExploreV1(metadata: types.GetCollectionsCollectionAttributesExploreV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesExploreV1Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/explore/v1', 'get', metadata);
  }

  /**
   * All attributes + token ids
   *
   */
  getCollectionsCollectionAttributesStaticV1(metadata: types.GetCollectionsCollectionAttributesStaticV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesStaticV1Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/static/v1', 'get', metadata);
  }

  /**
   * All attributes
   *
   */
  getCollectionsCollectionAttributesAllV3(metadata: types.GetCollectionsCollectionAttributesAllV3MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesAllV3Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/all/v3', 'get', metadata);
  }

  /**
   * Get all attributes in a collection
   *
   */
  getCollectionsCollectionAttributesAllV1(metadata: types.GetCollectionsCollectionAttributesAllV1MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesAllV1Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/all/v1', 'get', metadata);
  }

  /**
   * All attributes
   *
   */
  getCollectionsCollectionAttributesAllV2(metadata: types.GetCollectionsCollectionAttributesAllV2MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesAllV2Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/all/v2', 'get', metadata);
  }

  /**
   * Get detailed aggregate about attributes in a collection, attribute floors
   *
   * @summary Explore attributes
   */
  getCollectionsCollectionAttributesExploreV2(metadata: types.GetCollectionsCollectionAttributesExploreV2MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesExploreV2Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/explore/v2', 'get', metadata);
  }

  /**
   * Use this API to see stats on a specific attribute within a collection. This endpoint
   * will return `tokenCount`, `onSaleCount`, `sampleImages`, and `floorAsk` by default. 
   *
   * @summary Explore attributes
   */
  getCollectionsCollectionAttributesExploreV4(metadata: types.GetCollectionsCollectionAttributesExploreV4MetadataParam): Promise<FetchResponse<200, types.GetCollectionsCollectionAttributesExploreV4Response200>> {
    return this.core.fetch('/collections/{collection}/attributes/explore/v4', 'get', metadata);
  }

  /**
   * Return the top bids for the given user tokens. Please mark `excludeEOA` as `true` to
   * exclude Blur orders.
   *
   * @summary User Top Bids
   */
  getOrdersUsersUserTopbidsV4(metadata: types.GetOrdersUsersUserTopbidsV4MetadataParam): Promise<FetchResponse<200, types.GetOrdersUsersUserTopbidsV4Response200>> {
    return this.core.fetch('/orders/users/{user}/top-bids/v4', 'get', metadata);
  }

  /**
   * Return the top bids for the given user tokens
   *
   * @summary User Top Bids
   */
  getOrdersUsersUserTopbidsV2(metadata: types.GetOrdersUsersUserTopbidsV2MetadataParam): Promise<FetchResponse<200, types.GetOrdersUsersUserTopbidsV2Response200>> {
    return this.core.fetch('/orders/users/{user}/top-bids/v2', 'get', metadata);
  }

  /**
   * Return the top bids for the given user tokens
   *
   * @summary User Top Bids
   */
  getOrdersUsersUserTopbidsV1(metadata: types.GetOrdersUsersUserTopbidsV1MetadataParam): Promise<FetchResponse<200, types.GetOrdersUsersUserTopbidsV1Response200>> {
    return this.core.fetch('/orders/users/{user}/top-bids/v1', 'get', metadata);
  }

  /**
   * Return the top bids for the given user tokens
   *
   * @summary User Top Bids
   */
  getOrdersUsersUserTopbidsV3(metadata: types.GetOrdersUsersUserTopbidsV3MetadataParam): Promise<FetchResponse<200, types.GetOrdersUsersUserTopbidsV3Response200>> {
    return this.core.fetch('/orders/users/{user}/top-bids/v3', 'get', metadata);
  }

  /**
   * Redirect to the given collection image
   *
   */
  getRedirectCollectionsCollectionImageV1(metadata: types.GetRedirectCollectionsCollectionImageV1MetadataParam): Promise<FetchResponse<number, types.GetRedirectCollectionsCollectionImageV1ResponseDefault>> {
    return this.core.fetch('/redirect/collections/{collection}/image/v1', 'get', metadata);
  }

  /**
   * Redirect response to the given currency address icon
   *
   */
  getRedirectCurrencyAddressIconV1(metadata: types.GetRedirectCurrencyAddressIconV1MetadataParam): Promise<FetchResponse<number, types.GetRedirectCurrencyAddressIconV1ResponseDefault>> {
    return this.core.fetch('/redirect/currency/{address}/icon/v1', 'get', metadata);
  }

  /**
   * Redirect response to the given source logo
   *
   */
  getRedirectSourcesSourceLogoV2(metadata: types.GetRedirectSourcesSourceLogoV2MetadataParam): Promise<FetchResponse<number, types.GetRedirectSourcesSourceLogoV2ResponseDefault>> {
    return this.core.fetch('/redirect/sources/{source}/logo/v2', 'get', metadata);
  }

  /**
   * Redirect response to the given token image
   *
   */
  getRedirectTokensTokenImageV1(metadata: types.GetRedirectTokensTokenImageV1MetadataParam): Promise<FetchResponse<number, types.GetRedirectTokensTokenImageV1ResponseDefault>> {
    return this.core.fetch('/redirect/tokens/{token}/image/v1', 'get', metadata);
  }

  /**
   * Redirect response to the given source token page
   *
   */
  getRedirectSourcesSourceTokensTokenLinkV2(metadata: types.GetRedirectSourcesSourceTokensTokenLinkV2MetadataParam): Promise<FetchResponse<number, types.GetRedirectSourcesSourceTokensTokenLinkV2ResponseDefault>> {
    return this.core.fetch('/redirect/sources/{source}/tokens/{token}/link/v2', 'get', metadata);
  }

  /**
   * This API requires an administrator API for execution. Explore and try the
   * `/collections-sets/v1` or `/contracts-sets/v1` endpoints. Please contact technical
   * support with more questions.
   *
   * @summary Set a community for a specific collection
   */
  putCollectionsCollectionCommunityV1(body: types.PutCollectionsCollectionCommunityV1BodyParam, metadata: types.PutCollectionsCollectionCommunityV1MetadataParam): Promise<FetchResponse<200, types.PutCollectionsCollectionCommunityV1Response200>> {
    return this.core.fetch('/collections/{collection}/community/v1', 'put', body, metadata);
  }

  /**
   * The API key can be used in every route, by setting it as a request header **x-api-key**.
   *
   * <a href='https://docs.reservoir.tools/reference/getting-started'>Learn more</a> about
   * API Keys and Rate Limiting
   *
   * @summary Generate API Key
   */
  postApikeys(body: types.PostApikeysFormDataParam, metadata: types.PostApikeysMetadataParam): Promise<FetchResponse<200, types.PostApikeysResponse200>> {
    return this.core.fetch('/api-keys', 'post', body, metadata);
  }

  /**
   * Trigger calculation of the give collection tokens rarity
   *
   */
  postAdminCalcrarity(body: types.PostAdminCalcrarityBodyParam, metadata: types.PostAdminCalcrarityMetadataParam): Promise<FetchResponse<number, types.PostAdminCalcrarityResponseDefault>> {
    return this.core.fetch('/admin/calc-rarity', 'post', body, metadata);
  }

  /**
   * Create rate limit
   *
   */
  postAdminCreateratelimitrule(body: types.PostAdminCreateratelimitruleBodyParam, metadata: types.PostAdminCreateratelimitruleMetadataParam): Promise<FetchResponse<number, types.PostAdminCreateratelimitruleResponseDefault>> {
    return this.core.fetch('/admin/create-rate-limit-rule', 'post', body, metadata);
  }

  /**
   * Delete the rate limit with the given ID
   *
   */
  postAdminDeleteratelimitrule(body: types.PostAdminDeleteratelimitruleBodyParam, metadata: types.PostAdminDeleteratelimitruleMetadataParam): Promise<FetchResponse<number, types.PostAdminDeleteratelimitruleResponseDefault>> {
    return this.core.fetch('/admin/delete-rate-limit-rule', 'post', body, metadata);
  }

  /**
   * Trigger fixing any orphaned block.
   *
   */
  postAdminFixblocks(body: types.PostAdminFixblocksBodyParam, metadata: types.PostAdminFixblocksMetadataParam): Promise<FetchResponse<number, types.PostAdminFixblocksResponseDefault>> {
    return this.core.fetch('/admin/fix-blocks', 'post', body, metadata);
  }

  /**
   * Trigger fixing any cache inconsistencies for array of contracts.
   *
   */
  postAdminFixcache(body: types.PostAdminFixcacheBodyParam, metadata: types.PostAdminFixcacheMetadataParam): Promise<FetchResponse<number, types.PostAdminFixcacheResponseDefault>> {
    return this.core.fetch('/admin/fix-cache', 'post', body, metadata);
  }

  /**
   * Trigger fixing any order inconsistencies.
   *
   */
  postAdminFixorders(body: types.PostAdminFixordersBodyParam, metadata: types.PostAdminFixordersMetadataParam): Promise<FetchResponse<number, types.PostAdminFixordersResponseDefault>> {
    return this.core.fetch('/admin/fix-orders', 'post', body, metadata);
  }

  /**
   * Trigger fixing any cache inconsistencies for specific token.
   *
   */
  postAdminFixtokencache(body: types.PostAdminFixtokencacheBodyParam, metadata: types.PostAdminFixtokencacheMetadataParam): Promise<FetchResponse<number, types.PostAdminFixtokencacheResponseDefault>> {
    return this.core.fetch('/admin/fix-token-cache', 'post', body, metadata);
  }

  /**
   * Trigger metadata indexing for a token's collection
   *
   */
  postAdminIndexmetadata(body: types.PostAdminIndexmetadataBodyParam, metadata: types.PostAdminIndexmetadataMetadataParam): Promise<FetchResponse<number, types.PostAdminIndexmetadataResponseDefault>> {
    return this.core.fetch('/admin/index-metadata', 'post', body, metadata);
  }

  /**
   * Pause rabbit queue
   *
   */
  postAdminPauserabbitqueue(body: types.PostAdminPauserabbitqueueBodyParam, metadata: types.PostAdminPauserabbitqueueMetadataParam): Promise<FetchResponse<number, types.PostAdminPauserabbitqueueResponseDefault>> {
    return this.core.fetch('/admin/pause-rabbit-queue', 'post', body, metadata);
  }

  /**
   * Refresh a collection's orders and metadata
   *
   */
  postAdminRefreshcollection(body: types.PostAdminRefreshcollectionBodyParam, metadata: types.PostAdminRefreshcollectionMetadataParam): Promise<FetchResponse<number, types.PostAdminRefreshcollectionResponseDefault>> {
    return this.core.fetch('/admin/refresh-collection', 'post', body, metadata);
  }

  /**
   * Refresh a token's orders and metadata
   *
   */
  postAdminRefreshtoken(body: types.PostAdminRefreshtokenBodyParam, metadata: types.PostAdminRefreshtokenMetadataParam): Promise<FetchResponse<number, types.PostAdminRefreshtokenResponseDefault>> {
    return this.core.fetch('/admin/refresh-token', 'post', body, metadata);
  }

  /**
   * Resume rabbit queue
   *
   */
  postAdminResumerabbitqueue(body: types.PostAdminResumerabbitqueueBodyParam, metadata: types.PostAdminResumerabbitqueueMetadataParam): Promise<FetchResponse<number, types.PostAdminResumerabbitqueueResponseDefault>> {
    return this.core.fetch('/admin/resume-rabbit-queue', 'post', body, metadata);
  }

  /**
   * Trigger a resync from mainnet to all other chains of the given api key.
   *
   */
  postAdminResyncapikey(body: types.PostAdminResyncapikeyBodyParam, metadata: types.PostAdminResyncapikeyMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncapikeyResponseDefault>>;
  postAdminResyncapikey(metadata: types.PostAdminResyncapikeyMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncapikeyResponseDefault>>;
  postAdminResyncapikey(body?: types.PostAdminResyncapikeyBodyParam | types.PostAdminResyncapikeyMetadataParam, metadata?: types.PostAdminResyncapikeyMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncapikeyResponseDefault>> {
    return this.core.fetch('/admin/resync-api-key', 'post', body, metadata);
  }

  /**
   * Trigger fixing any floor events inconsistencies for any particular collection.
   *
   */
  postAdminResyncfloorevents(body: types.PostAdminResyncflooreventsBodyParam, metadata: types.PostAdminResyncflooreventsMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncflooreventsResponseDefault>>;
  postAdminResyncfloorevents(metadata: types.PostAdminResyncflooreventsMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncflooreventsResponseDefault>>;
  postAdminResyncfloorevents(body?: types.PostAdminResyncflooreventsBodyParam | types.PostAdminResyncflooreventsMetadataParam, metadata?: types.PostAdminResyncflooreventsMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncflooreventsResponseDefault>> {
    return this.core.fetch('/admin/resync-floor-events', 'post', body, metadata);
  }

  /**
   * Trigger the recalculation of nft balances for tokens transferred in any particular block
   * range
   *
   */
  postAdminResyncnftbalances(body: types.PostAdminResyncnftbalancesBodyParam, metadata: types.PostAdminResyncnftbalancesMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncnftbalancesResponseDefault>> {
    return this.core.fetch('/admin/resync-nft-balances', 'post', body, metadata);
  }

  /**
   * Trigger the recalculation of sale royalties for any particular block range.
   *
   */
  postAdminResyncsaleroyalties(body: types.PostAdminResyncsaleroyaltiesBodyParam, metadata: types.PostAdminResyncsaleroyaltiesMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncsaleroyaltiesResponseDefault>>;
  postAdminResyncsaleroyalties(metadata: types.PostAdminResyncsaleroyaltiesMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncsaleroyaltiesResponseDefault>>;
  postAdminResyncsaleroyalties(body?: types.PostAdminResyncsaleroyaltiesBodyParam | types.PostAdminResyncsaleroyaltiesMetadataParam, metadata?: types.PostAdminResyncsaleroyaltiesMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncsaleroyaltiesResponseDefault>> {
    return this.core.fetch('/admin/resync-sale-royalties', 'post', body, metadata);
  }

  /**
   * Trigger re-syncing of specific source domain
   *
   */
  postAdminResyncsource(body: types.PostAdminResyncsourceBodyParam, metadata: types.PostAdminResyncsourceMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncsourceResponseDefault>>;
  postAdminResyncsource(metadata: types.PostAdminResyncsourceMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncsourceResponseDefault>>;
  postAdminResyncsource(body?: types.PostAdminResyncsourceBodyParam | types.PostAdminResyncsourceMetadataParam, metadata?: types.PostAdminResyncsourceMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncsourceResponseDefault>> {
    return this.core.fetch('/admin/resync-source', 'post', body, metadata);
  }

  /**
   * Trigger the recalculation of user in certain collection
   *
   */
  postAdminResyncuserbalance(body: types.PostAdminResyncuserbalanceBodyParam, metadata: types.PostAdminResyncuserbalanceMetadataParam): Promise<FetchResponse<number, types.PostAdminResyncuserbalanceResponseDefault>> {
    return this.core.fetch('/admin/resync-user-balance', 'post', body, metadata);
  }

  /**
   * Retry all the messages within the given dead letter rabbit queue
   *
   */
  postAdminRetryrabbitqueue(body: types.PostAdminRetryrabbitqueueBodyParam, metadata: types.PostAdminRetryrabbitqueueMetadataParam): Promise<FetchResponse<number, types.PostAdminRetryrabbitqueueResponseDefault>> {
    return this.core.fetch('/admin/retry-rabbit-queue', 'post', body, metadata);
  }

  /**
   * Revalidate an existing mint
   *
   */
  postAdminRevalidatemint(body: types.PostAdminRevalidatemintBodyParam, metadata: types.PostAdminRevalidatemintMetadataParam): Promise<FetchResponse<number, types.PostAdminRevalidatemintResponseDefault>> {
    return this.core.fetch('/admin/revalidate-mint', 'post', body, metadata);
  }

  /**
   * Revalidate an existing order
   *
   */
  postAdminRevalidateorder(body: types.PostAdminRevalidateorderBodyParam, metadata: types.PostAdminRevalidateorderMetadataParam): Promise<FetchResponse<number, types.PostAdminRevalidateorderResponseDefault>> {
    return this.core.fetch('/admin/revalidate-order', 'post', body, metadata);
  }

  /**
   * Add a new router contract
   *
   */
  postAdminRouters(body: types.PostAdminRoutersBodyParam, metadata: types.PostAdminRoutersMetadataParam): Promise<FetchResponse<number, types.PostAdminRoutersResponseDefault>> {
    return this.core.fetch('/admin/routers', 'post', body, metadata);
  }

  /**
   * Set a community for a specific collection
   *
   */
  postAdminSetcommunity(body: types.PostAdminSetcommunityBodyParam, metadata: types.PostAdminSetcommunityMetadataParam): Promise<FetchResponse<number, types.PostAdminSetcommunityResponseDefault>> {
    return this.core.fetch('/admin/set-community', 'post', body, metadata);
  }

  /**
   * Set the tokens indexing method for all tokens in certain collection
   *
   */
  postAdminSetindexingmethod(body: types.PostAdminSetindexingmethodBodyParam, metadata: types.PostAdminSetindexingmethodMetadataParam): Promise<FetchResponse<number, types.PostAdminSetindexingmethodResponseDefault>> {
    return this.core.fetch('/admin/set-indexing-method', 'post', body, metadata);
  }

  /**
   * Trigger a re-sync of daily volume calculations, volumes should only be calculated when
   * fill_events have been fully synced
   *
   */
  postAdminSyncdailyvolumes(body: types.PostAdminSyncdailyvolumesBodyParam, metadata: types.PostAdminSyncdailyvolumesMetadataParam): Promise<FetchResponse<number, types.PostAdminSyncdailyvolumesResponseDefault>>;
  postAdminSyncdailyvolumes(metadata: types.PostAdminSyncdailyvolumesMetadataParam): Promise<FetchResponse<number, types.PostAdminSyncdailyvolumesResponseDefault>>;
  postAdminSyncdailyvolumes(body?: types.PostAdminSyncdailyvolumesBodyParam | types.PostAdminSyncdailyvolumesMetadataParam, metadata?: types.PostAdminSyncdailyvolumesMetadataParam): Promise<FetchResponse<number, types.PostAdminSyncdailyvolumesResponseDefault>> {
    return this.core.fetch('/admin/sync-daily-volumes', 'post', body, metadata);
  }

  /**
   * Trigger syncing of events.
   *
   */
  postAdminSyncevents(body: types.PostAdminSynceventsBodyParam, metadata: types.PostAdminSynceventsMetadataParam): Promise<FetchResponse<number, types.PostAdminSynceventsResponseDefault>> {
    return this.core.fetch('/admin/sync-events', 'post', body, metadata);
  }

  /**
   * Trigger bullmq job
   *
   */
  postAdminTriggerjob(body: types.PostAdminTriggerjobBodyParam, metadata: types.PostAdminTriggerjobMetadataParam): Promise<FetchResponse<number, types.PostAdminTriggerjobResponseDefault>>;
  postAdminTriggerjob(metadata: types.PostAdminTriggerjobMetadataParam): Promise<FetchResponse<number, types.PostAdminTriggerjobResponseDefault>>;
  postAdminTriggerjob(body?: types.PostAdminTriggerjobBodyParam | types.PostAdminTriggerjobMetadataParam, metadata?: types.PostAdminTriggerjobMetadataParam): Promise<FetchResponse<number, types.PostAdminTriggerjobResponseDefault>> {
    return this.core.fetch('/admin/trigger-job', 'post', body, metadata);
  }

  /**
   * Trigger rabbit job
   *
   */
  postAdminTriggerrabbitjob(body: types.PostAdminTriggerrabbitjobBodyParam, metadata: types.PostAdminTriggerrabbitjobMetadataParam): Promise<FetchResponse<number, types.PostAdminTriggerrabbitjobResponseDefault>>;
  postAdminTriggerrabbitjob(metadata: types.PostAdminTriggerrabbitjobMetadataParam): Promise<FetchResponse<number, types.PostAdminTriggerrabbitjobResponseDefault>>;
  postAdminTriggerrabbitjob(body?: types.PostAdminTriggerrabbitjobBodyParam | types.PostAdminTriggerrabbitjobMetadataParam, metadata?: types.PostAdminTriggerrabbitjobMetadataParam): Promise<FetchResponse<number, types.PostAdminTriggerrabbitjobResponseDefault>> {
    return this.core.fetch('/admin/trigger-rabbit-job', 'post', body, metadata);
  }

  /**
   * Update the given api key
   *
   */
  postAdminUpdateapikey(body: types.PostAdminUpdateapikeyBodyParam, metadata: types.PostAdminUpdateapikeyMetadataParam): Promise<FetchResponse<number, types.PostAdminUpdateapikeyResponseDefault>>;
  postAdminUpdateapikey(metadata: types.PostAdminUpdateapikeyMetadataParam): Promise<FetchResponse<number, types.PostAdminUpdateapikeyResponseDefault>>;
  postAdminUpdateapikey(body?: types.PostAdminUpdateapikeyBodyParam | types.PostAdminUpdateapikeyMetadataParam, metadata?: types.PostAdminUpdateapikeyMetadataParam): Promise<FetchResponse<number, types.PostAdminUpdateapikeyResponseDefault>> {
    return this.core.fetch('/admin/update-api-key', 'post', body, metadata);
  }

  /**
   * Increment the metadata version for a collection to bust the cache
   *
   */
  postAdminUpdateimageversion(body: types.PostAdminUpdateimageversionBodyParam, metadata: types.PostAdminUpdateimageversionMetadataParam): Promise<FetchResponse<number, types.PostAdminUpdateimageversionResponseDefault>> {
    return this.core.fetch('/admin/update-image-version', 'post', body, metadata);
  }

  /**
   * Update the rate limit for the given ID
   *
   */
  postAdminUpdateratelimitrule(body: types.PostAdminUpdateratelimitruleBodyParam, metadata: types.PostAdminUpdateratelimitruleMetadataParam): Promise<FetchResponse<number, types.PostAdminUpdateratelimitruleResponseDefault>> {
    return this.core.fetch('/admin/update-rate-limit-rule', 'post', body, metadata);
  }

  /**
   * Trigger re-syncing of specific source domain
   *
   */
  postAdminUpdatesource(body: types.PostAdminUpdatesourceBodyParam, metadata: types.PostAdminUpdatesourceMetadataParam): Promise<FetchResponse<number, types.PostAdminUpdatesourceResponseDefault>>;
  postAdminUpdatesource(metadata: types.PostAdminUpdatesourceMetadataParam): Promise<FetchResponse<number, types.PostAdminUpdatesourceResponseDefault>>;
  postAdminUpdatesource(body?: types.PostAdminUpdatesourceBodyParam | types.PostAdminUpdatesourceMetadataParam, metadata?: types.PostAdminUpdatesourceMetadataParam): Promise<FetchResponse<number, types.PostAdminUpdatesourceResponseDefault>> {
    return this.core.fetch('/admin/update-source', 'post', body, metadata);
  }

  /**
   * Submit single order
   *
   */
  postOrderV2(body?: types.PostOrderV2BodyParam, metadata?: types.PostOrderV2MetadataParam): Promise<FetchResponse<200, types.PostOrderV2Response200>> {
    return this.core.fetch('/order/v2', 'post', body, metadata);
  }

  /**
   * Submit signed order
   *
   */
  postOrderV3(body?: types.PostOrderV3BodyParam, metadata?: types.PostOrderV3MetadataParam): Promise<FetchResponse<200, types.PostOrderV3Response200>> {
    return this.core.fetch('/order/v3', 'post', body, metadata);
  }

  /**
   * Submit Signed Orders
   *
   */
  postOrderV4(body?: types.PostOrderV4BodyParam, metadata?: types.PostOrderV4MetadataParam): Promise<FetchResponse<200, types.PostOrderV4Response200>> {
    return this.core.fetch('/order/v4', 'post', body, metadata);
  }

  /**
   * Submit multiple Seaport offers (compatible with OpenSea's API response)
   *
   */
  postSeaportOffers(body?: types.PostSeaportOffersBodyParam): Promise<FetchResponse<number, types.PostSeaportOffersResponseDefault>> {
    return this.core.fetch('/seaport/offers', 'post', body);
  }

  /**
   * Create Token Set
   *
   */
  postTokensetsV1(body: types.PostTokensetsV1BodyParam): Promise<FetchResponse<200, types.PostTokensetsV1Response200>> {
    return this.core.fetch('/token-sets/v1', 'post', body);
  }

  /**
   * Get API usage metrics for the given API key
   *
   * @summary Get API usage metrics for the given API key
   */
  postAdminApikeysMetrics(body: types.PostAdminApikeysMetricsFormDataParam, metadata: types.PostAdminApikeysMetricsMetadataParam): Promise<FetchResponse<200, types.PostAdminApikeysMetricsResponse200>> {
    return this.core.fetch('/admin/api-keys/metrics', 'post', body, metadata);
  }

  /**
   * This API requires an allowed API key for execution. Please contact technical support
   * with more questions.
   *
   * @summary Disable or reenable metadata for a collection
   */
  postCollectionsDisablemetadataV1(body: types.PostCollectionsDisablemetadataV1BodyParam, metadata: types.PostCollectionsDisablemetadataV1MetadataParam): Promise<FetchResponse<200, types.PostCollectionsDisablemetadataV1Response200>> {
    return this.core.fetch('/collections/disable-metadata/v1', 'post', body, metadata);
  }

  /**
   * This API can be used by allowed API keys to update the nsfw status of a collection.
   *
   * @summary Update collections nsfw status
   */
  postCollectionsNsfwstatusV1(body: types.PostCollectionsNsfwstatusV1BodyParam, metadata: types.PostCollectionsNsfwstatusV1MetadataParam): Promise<FetchResponse<200, types.PostCollectionsNsfwstatusV1Response200>> {
    return this.core.fetch('/collections/nsfw-status/v1', 'post', body, metadata);
  }

  /**
   * Refresh Collection
   *
   */
  postCollectionsRefreshV1(body: types.PostCollectionsRefreshV1BodyParam, metadata?: types.PostCollectionsRefreshV1MetadataParam): Promise<FetchResponse<200, types.PostCollectionsRefreshV1Response200>> {
    return this.core.fetch('/collections/refresh/v1', 'post', body, metadata);
  }

  /**
   * This API can be used by allowed API keys to update the spam status of a collection.
   *
   * @summary Update collections spam status
   */
  postCollectionsSpamstatusV1(body: types.PostCollectionsSpamstatusV1BodyParam, metadata: types.PostCollectionsSpamstatusV1MetadataParam): Promise<FetchResponse<200, types.PostCollectionsSpamstatusV1Response200>> {
    return this.core.fetch('/collections/spam-status/v1', 'post', body, metadata);
  }

  /**
   * Attach a signature to an existing auth challenge
   *
   */
  postExecuteAuthsignatureV1(body: types.PostExecuteAuthsignatureV1BodyParam, metadata: types.PostExecuteAuthsignatureV1MetadataParam): Promise<FetchResponse<200, types.PostExecuteAuthsignatureV1Response200>> {
    return this.core.fetch('/execute/auth-signature/v1', 'post', body, metadata);
  }

  /**
   * Generate a bid and submit it to multiple marketplaces
   *
   * @summary Create bid (offer)
   */
  postExecuteBidV4(body: types.PostExecuteBidV4BodyParam): Promise<FetchResponse<200, types.PostExecuteBidV4Response200>> {
    return this.core.fetch('/execute/bid/v4', 'post', body);
  }

  /**
   * Generate bids and submit them to multiple marketplaces.
   *
   *  Notes:
   *
   * - Please use the `/cross-posting-orders/v1` to check the status on cross posted bids.
   *
   * - We recommend using Reservoir SDK as it abstracts the process of iterating through
   * steps, and returning callbacks that can be used to update your UI.
   *
   * @summary Create Bids
   */
  postExecuteBidV5(body: types.PostExecuteBidV5BodyParam): Promise<FetchResponse<200, types.PostExecuteBidV5Response200>> {
    return this.core.fetch('/execute/bid/v5', 'post', body);
  }

  /**
   * Buy tokens
   *
   */
  postExecuteBuyV5(body: types.PostExecuteBuyV5BodyParam): Promise<FetchResponse<200, types.PostExecuteBuyV5Response200>> {
    return this.core.fetch('/execute/buy/v5', 'post', body);
  }

  /**
   * Buy tokens
   *
   */
  postExecuteBuyV6(body: types.PostExecuteBuyV6BodyParam): Promise<FetchResponse<200, types.PostExecuteBuyV6Response200>> {
    return this.core.fetch('/execute/buy/v6', 'post', body);
  }

  /**
   * Use this API to fill listings. We recommend using the SDK over this API as the SDK will
   * iterate through the steps and return callbacks. Please mark `excludeEOA` as `true` to
   * exclude Blur orders.
   *
   * @summary Buy Tokens
   */
  postExecuteBuyV7(body: types.PostExecuteBuyV7BodyParam): Promise<FetchResponse<200, types.PostExecuteBuyV7Response200>> {
    return this.core.fetch('/execute/buy/v7', 'post', body);
  }

  /**
   * Make arbitrary same-chain and cross-chain calls via solver
   *
   */
  postExecuteCallV1(body: types.PostExecuteCallV1BodyParam): Promise<FetchResponse<200, types.PostExecuteCallV1Response200>> {
    return this.core.fetch('/execute/call/v1', 'post', body);
  }

  /**
   * Cancel existing orders on any marketplace
   *
   * @summary Cancel Orders
   */
  postExecuteCancelV3(body?: types.PostExecuteCancelV3BodyParam): Promise<FetchResponse<200, types.PostExecuteCancelV3Response200>> {
    return this.core.fetch('/execute/cancel/v3', 'post', body);
  }

  /**
   * If your order was created using the Seaport Oracle to allow off chain & gasless
   * cancellations, you can just use the Kit's cancel modals, SDK's `cancelOrder`, or
   * `/execute/cancel/`. Those tools will automatically access this endpoint for an oracle
   * cancellation without you directly calling this endpoint.
   *
   * @summary Off-chain cancel orders
   */
  postExecuteCancelsignatureV1(body: types.PostExecuteCancelsignatureV1BodyParam, metadata?: types.PostExecuteCancelsignatureV1MetadataParam): Promise<FetchResponse<200, types.PostExecuteCancelsignatureV1Response200>> {
    return this.core.fetch('/execute/cancel-signature/v1', 'post', body, metadata);
  }

  /**
   * Deposit funds to the solver
   *
   */
  postExecuteDepositV1(body: types.PostExecuteDepositV1BodyParam): Promise<FetchResponse<200, types.PostExecuteDepositV1Response200>> {
    return this.core.fetch('/execute/deposit/v1', 'post', body);
  }

  /**
   * Generate a listing and submit it to multiple marketplaces
   *
   * @summary Create ask (listing)
   */
  postExecuteListV4(body: types.PostExecuteListV4BodyParam): Promise<FetchResponse<200, types.PostExecuteListV4Response200>> {
    return this.core.fetch('/execute/list/v4', 'post', body);
  }

  /**
   * Generate listings and submit them to multiple marketplaces.
   *
   *  Notes:
   *
   * - Please use the `/cross-posting-orders/v1` to check the status on cross posted bids.
   *
   * - We recommend using Reservoir SDK as it abstracts the process of iterating through
   * steps, and returning callbacks that can be used to update your UI.
   *
   * @summary Create Listings
   */
  postExecuteListV5(body: types.PostExecuteListV5BodyParam): Promise<FetchResponse<200, types.PostExecuteListV5Response200>> {
    return this.core.fetch('/execute/list/v5', 'post', body);
  }

  /**
   * Use this API to mint tokens. We recommend using the SDK over this API as the SDK will
   * iterate through the steps and return callbacks.
   *
   * @summary Mint Tokens
   */
  postExecuteMintV1(body: types.PostExecuteMintV1BodyParam): Promise<FetchResponse<200, types.PostExecuteMintV1Response200>> {
    return this.core.fetch('/execute/mint/v1', 'post', body);
  }

  /**
   * Attach a signature to an existing permit
   *
   */
  postExecutePermitsignatureV1(body: types.PostExecutePermitsignatureV1BodyParam, metadata: types.PostExecutePermitsignatureV1MetadataParam): Promise<FetchResponse<200, types.PostExecutePermitsignatureV1Response200>> {
    return this.core.fetch('/execute/permit-signature/v1', 'post', body, metadata);
  }

  /**
   * Attach a signature to an existing pre-signature
   *
   */
  postExecutePresignatureV1(body: types.PostExecutePresignatureV1BodyParam, metadata: types.PostExecutePresignatureV1MetadataParam): Promise<FetchResponse<200, types.PostExecutePresignatureV1Response200>> {
    return this.core.fetch('/execute/pre-signature/v1', 'post', body, metadata);
  }

  /**
   * Send the success status of an execution
   *
   */
  postExecuteResultsV1(body: types.PostExecuteResultsV1BodyParam): Promise<FetchResponse<200, types.PostExecuteResultsV1Response200>> {
    return this.core.fetch('/execute/results/v1', 'post', body);
  }

  /**
   * Sell tokens (accept bids)
   *
   */
  postExecuteSellV6(body: types.PostExecuteSellV6BodyParam): Promise<FetchResponse<200, types.PostExecuteSellV6Response200>> {
    return this.core.fetch('/execute/sell/v6', 'post', body);
  }

  /**
   * Use this API to accept bids. We recommend using the SDK over this API as the SDK will
   * iterate through the steps and return callbacks. Please mark `excludeEOA` as `true` to
   * exclude Blur orders.
   *
   * @summary Sell Tokens
   */
  postExecuteSellV7(body: types.PostExecuteSellV7BodyParam): Promise<FetchResponse<200, types.PostExecuteSellV7Response200>> {
    return this.core.fetch('/execute/sell/v7', 'post', body);
  }

  /**
   * Indirectly fill an order via a solver
   *
   */
  postExecuteSolveV1(body: types.PostExecuteSolveV1BodyParam, metadata?: types.PostExecuteSolveV1MetadataParam): Promise<FetchResponse<200, types.PostExecuteSolveV1Response200>> {
    return this.core.fetch('/execute/solve/v1', 'post', body, metadata);
  }

  /**
   * Get the status of an execution
   *
   */
  postExecuteStatusV1(body: types.PostExecuteStatusV1BodyParam): Promise<FetchResponse<200, types.PostExecuteStatusV1Response200>> {
    return this.core.fetch('/execute/status/v1', 'post', body);
  }

  /**
   * Use this endpoint to bulk transfer an array of NFTs.
   *
   * @summary Transfer Tokens
   */
  postExecuteTransferV1(body: types.PostExecuteTransferV1BodyParam): Promise<FetchResponse<200, types.PostExecuteTransferV1Response200>> {
    return this.core.fetch('/execute/transfer/v1', 'post', body);
  }

  /**
   * Create or update an external cosigner
   *
   */
  postManagementCosignersV1(body: types.PostManagementCosignersV1BodyParam): Promise<FetchResponse<200, types.PostManagementCosignersV1Response200>> {
    return this.core.fetch('/management/cosigners/v1', 'post', body);
  }

  /**
   * Invalidate stale orders
   *
   */
  postOrdersInvalidateV1(body: types.PostOrdersInvalidateV1BodyParam, metadata: types.PostOrdersInvalidateV1MetadataParam): Promise<FetchResponse<number, types.PostOrdersInvalidateV1ResponseDefault>> {
    return this.core.fetch('/orders/invalidate/v1', 'post', body, metadata);
  }

  /**
   * This API requires an allowed API key for execution. Please contact technical support
   * with more questions.
   *
   * @summary Disable or reenable metadata for a token
   */
  postTokensDisablemetadataV1(body: types.PostTokensDisablemetadataV1BodyParam, metadata: types.PostTokensDisablemetadataV1MetadataParam): Promise<FetchResponse<200, types.PostTokensDisablemetadataV1Response200>> {
    return this.core.fetch('/tokens/disable-metadata/v1', 'post', body, metadata);
  }

  /**
   * Update token flag status
   *
   */
  postTokensFlagV1(body: types.PostTokensFlagV1BodyParam): Promise<FetchResponse<200, types.PostTokensFlagV1Response200>> {
    return this.core.fetch('/tokens/flag/v1', 'post', body);
  }

  /**
   * This API can be used by allowed API keys to update the nsfw status of a token.
   *
   * @summary Update the tokens nsfw status
   */
  postTokensNsfwstatusV1(body: types.PostTokensNsfwstatusV1BodyParam, metadata: types.PostTokensNsfwstatusV1MetadataParam): Promise<FetchResponse<200, types.PostTokensNsfwstatusV1Response200>> {
    return this.core.fetch('/tokens/nsfw-status/v1', 'post', body, metadata);
  }

  /**
   * Token metadata is never automatically refreshed, but may be manually refreshed with this
   * API.
   *
   * Caution: This API should be used in moderation, like only when missing data is
   * discovered. Calling it in bulk or programmatically will result in your API key getting
   * rate limited.
   *
   * @summary Refresh Token
   */
  postTokensRefreshV1(body: types.PostTokensRefreshV1BodyParam): Promise<FetchResponse<200, types.PostTokensRefreshV1Response200>> {
    return this.core.fetch('/tokens/refresh/v1', 'post', body);
  }

  /**
   * Simulate the floor ask of any token
   *
   */
  postTokensSimulatefloorV1(body?: types.PostTokensSimulatefloorV1BodyParam): Promise<FetchResponse<200, types.PostTokensSimulatefloorV1Response200>> {
    return this.core.fetch('/tokens/simulate-floor/v1', 'post', body);
  }

  /**
   * Simulate the top bid of any token
   *
   */
  postTokensSimulatetopbidV1(body?: types.PostTokensSimulatetopbidV1BodyParam): Promise<FetchResponse<200, types.PostTokensSimulatetopbidV1Response200>> {
    return this.core.fetch('/tokens/simulate-top-bid/v1', 'post', body);
  }

  /**
   * This API can be used by allowed API keys to update the spam status of a token.
   *
   * @summary Update the tokens spam status
   */
  postTokensSpamstatusV1(body: types.PostTokensSpamstatusV1BodyParam, metadata: types.PostTokensSpamstatusV1MetadataParam): Promise<FetchResponse<200, types.PostTokensSpamstatusV1Response200>> {
    return this.core.fetch('/tokens/spam-status/v1', 'post', body, metadata);
  }

  /**
   * Override collections metadata and royalties
   *
   * @summary Override collections
   */
  postCollectionsCollectionOverrideV1(body: types.PostCollectionsCollectionOverrideV1BodyParam, metadata: types.PostCollectionsCollectionOverrideV1MetadataParam): Promise<FetchResponse<200, types.PostCollectionsCollectionOverrideV1Response200>>;
  postCollectionsCollectionOverrideV1(metadata: types.PostCollectionsCollectionOverrideV1MetadataParam): Promise<FetchResponse<200, types.PostCollectionsCollectionOverrideV1Response200>>;
  postCollectionsCollectionOverrideV1(body?: types.PostCollectionsCollectionOverrideV1BodyParam | types.PostCollectionsCollectionOverrideV1MetadataParam, metadata?: types.PostCollectionsCollectionOverrideV1MetadataParam): Promise<FetchResponse<200, types.PostCollectionsCollectionOverrideV1Response200>> {
    return this.core.fetch('/collections/{collection}/override/v1', 'post', body, metadata);
  }

  /**
   * Get the capacity for indirect filling via a solver
   *
   */
  postExecuteSolveCapacityV1(body: types.PostExecuteSolveCapacityV1BodyParam): Promise<FetchResponse<200, types.PostExecuteSolveCapacityV1Response200>> {
    return this.core.fetch('/execute/solve/capacity/v1', 'post', body);
  }

  /**
   * Simulate any given mint
   *
   */
  postManagementMintsSimulateV1(body: types.PostManagementMintsSimulateV1BodyParam): Promise<FetchResponse<200, types.PostManagementMintsSimulateV1Response200>> {
    return this.core.fetch('/management/mints/simulate/v1', 'post', body);
  }

  /**
   * Simulate any given order
   *
   */
  postManagementOrdersSimulateV1(body?: types.PostManagementOrdersSimulateV1BodyParam): Promise<FetchResponse<200, types.PostManagementOrdersSimulateV1Response200>> {
    return this.core.fetch('/management/orders/simulate/v1', 'post', body);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { GetAdminGetapikeyKeyMetadataParam, GetAdminGetapikeyKeyResponse200, GetAdminGetmarketplacesResponse200, GetAdminOpenapiResponseDefault, GetAdminProvidermetadataTypeMetadataParam, GetAdminProvidermetadataTypeResponseDefault, GetAdminRatelimitrulesMetadataParam, GetAdminRatelimitrulesResponseDefault, GetApikeysKeyRatelimitsMetadataParam, GetApikeysKeyRatelimitsResponse200, GetAssetsV1MetadataParam, GetAssetsV1ResponseDefault, GetAttributesV1MetadataParam, GetAttributesV1Response200, GetChainStatsV1Response200, GetCollectionV1MetadataParam, GetCollectionV1Response200, GetCollectionV2MetadataParam, GetCollectionV2Response200, GetCollectionV3MetadataParam, GetCollectionV3Response200, GetCollectionsActivityV4MetadataParam, GetCollectionsActivityV4Response200, GetCollectionsActivityV5MetadataParam, GetCollectionsActivityV5Response200, GetCollectionsActivityV6MetadataParam, GetCollectionsActivityV6Response200, GetCollectionsActivityV7MetadataParam, GetCollectionsActivityV7Response200, GetCollectionsCollectionActivityV1MetadataParam, GetCollectionsCollectionActivityV1Response200, GetCollectionsCollectionActivityV2MetadataParam, GetCollectionsCollectionActivityV2Response200, GetCollectionsCollectionActivityV3MetadataParam, GetCollectionsCollectionActivityV3Response200, GetCollectionsCollectionAttributesAllV1MetadataParam, GetCollectionsCollectionAttributesAllV1Response200, GetCollectionsCollectionAttributesAllV2MetadataParam, GetCollectionsCollectionAttributesAllV2Response200, GetCollectionsCollectionAttributesAllV3MetadataParam, GetCollectionsCollectionAttributesAllV3Response200, GetCollectionsCollectionAttributesAllV4MetadataParam, GetCollectionsCollectionAttributesAllV4Response200, GetCollectionsCollectionAttributesExploreV1MetadataParam, GetCollectionsCollectionAttributesExploreV1Response200, GetCollectionsCollectionAttributesExploreV2MetadataParam, GetCollectionsCollectionAttributesExploreV2Response200, GetCollectionsCollectionAttributesExploreV3MetadataParam, GetCollectionsCollectionAttributesExploreV3Response200, GetCollectionsCollectionAttributesExploreV4MetadataParam, GetCollectionsCollectionAttributesExploreV4Response200, GetCollectionsCollectionAttributesExploreV5MetadataParam, GetCollectionsCollectionAttributesExploreV5Response200, GetCollectionsCollectionAttributesStaticV1MetadataParam, GetCollectionsCollectionAttributesStaticV1Response200, GetCollectionsCollectionAttributesV1MetadataParam, GetCollectionsCollectionAttributesV1Response200, GetCollectionsCollectionMarketplaceconfigurationsV1MetadataParam, GetCollectionsCollectionMarketplaceconfigurationsV1Response200, GetCollectionsCollectionMarketplaceconfigurationsV2MetadataParam, GetCollectionsCollectionMarketplaceconfigurationsV2Response200, GetCollectionsCollectionOwnersdistributionV1MetadataParam, GetCollectionsCollectionOwnersdistributionV1Response200, GetCollectionsCollectionSupportedmarketplacesV1MetadataParam, GetCollectionsCollectionSupportedmarketplacesV1Response200, GetCollectionsCollectionTopbidsV1MetadataParam, GetCollectionsCollectionTopbidsV1Response200, GetCollectionsCollectionToptradersV1MetadataParam, GetCollectionsCollectionToptradersV1Response200, GetCollectionsCollectionidBidsV1MetadataParam, GetCollectionsCollectionidBidsV1Response200, GetCollectionsCollectionorslugV1MetadataParam, GetCollectionsCollectionorslugV1Response200, GetCollectionsDailyvolumesV1MetadataParam, GetCollectionsDailyvolumesV1Response200, GetCollectionsSearchV1MetadataParam, GetCollectionsSearchV1Response200, GetCollectionsTopsellingV1MetadataParam, GetCollectionsTopsellingV1Response200, GetCollectionsTopsellingV2MetadataParam, GetCollectionsTopsellingV2Response200, GetCollectionsTrendingV1MetadataParam, GetCollectionsTrendingV1Response200, GetCollectionsTrendingmintsV1MetadataParam, GetCollectionsTrendingmintsV1Response200, GetCollectionsV1MetadataParam, GetCollectionsV1Response200, GetCollectionsV2MetadataParam, GetCollectionsV2Response200, GetCollectionsV3MetadataParam, GetCollectionsV3Response200, GetCollectionsV4MetadataParam, GetCollectionsV4Response200, GetCollectionsV5MetadataParam, GetCollectionsV5Response200, GetCollectionsV6MetadataParam, GetCollectionsV6Response200, GetCollectionsV7MetadataParam, GetCollectionsV7Response200, GetCollectionssetsCollectionssetidOwnersdistributionV1MetadataParam, GetCollectionssetsCollectionssetidOwnersdistributionV1Response200, GetCrosspostingordersV1MetadataParam, GetCrosspostingordersV1Response200, GetCurrenciesConversionV1MetadataParam, GetCurrenciesConversionV1Response200, GetEventsAsksV2MetadataParam, GetEventsAsksV2Response200, GetEventsAsksV3MetadataParam, GetEventsAsksV3Response200, GetEventsBidsV1MetadataParam, GetEventsBidsV1Response200, GetEventsBidsV2MetadataParam, GetEventsBidsV2Response200, GetEventsBidsV3MetadataParam, GetEventsBidsV3Response200, GetEventsCollectionsFlooraskV1MetadataParam, GetEventsCollectionsFlooraskV1Response200, GetEventsCollectionsFlooraskV2MetadataParam, GetEventsCollectionsFlooraskV2Response200, GetEventsCollectionsTopbidV1MetadataParam, GetEventsCollectionsTopbidV1Response200, GetEventsCollectionsTopbidV2MetadataParam, GetEventsCollectionsTopbidV2Response200, GetEventsOrdersV1MetadataParam, GetEventsOrdersV1Response200, GetEventsTokensFlooraskV2MetadataParam, GetEventsTokensFlooraskV2Response200, GetEventsTokensFlooraskV3MetadataParam, GetEventsTokensFlooraskV3Response200, GetEventsTokensFlooraskV4MetadataParam, GetEventsTokensFlooraskV4Response200, GetExecuteCancelV2MetadataParam, GetExecuteCancelV2Response200, GetLiquidityUsersV1MetadataParam, GetLiquidityUsersV1Response200, GetLiquidityUsersV2MetadataParam, GetLiquidityUsersV2Response200, GetOracleCollectionsBidaskmidpointV1MetadataParam, GetOracleCollectionsBidaskmidpointV1Response200, GetOracleCollectionsFlooraskV4MetadataParam, GetOracleCollectionsFlooraskV4Response200, GetOracleCollectionsFlooraskV5MetadataParam, GetOracleCollectionsFlooraskV5Response200, GetOracleCollectionsFlooraskV6MetadataParam, GetOracleCollectionsFlooraskV6Response200, GetOracleCollectionsTopbidV2MetadataParam, GetOracleCollectionsTopbidV2Response200, GetOracleCollectionsTopbidV3MetadataParam, GetOracleCollectionsTopbidV3Response200, GetOracleTokensStatusV2MetadataParam, GetOracleTokensStatusV2Response200, GetOracleTokensStatusV3MetadataParam, GetOracleTokensStatusV3Response200, GetOrdersAllV1MetadataParam, GetOrdersAllV1Response200, GetOrdersAllV2MetadataParam, GetOrdersAllV2Response200, GetOrdersAsksV1MetadataParam, GetOrdersAsksV1Response200, GetOrdersAsksV2MetadataParam, GetOrdersAsksV2Response200, GetOrdersAsksV3MetadataParam, GetOrdersAsksV3Response200, GetOrdersAsksV4MetadataParam, GetOrdersAsksV4Response200, GetOrdersAsksV5MetadataParam, GetOrdersAsksV5Response200, GetOrdersBidsV1MetadataParam, GetOrdersBidsV1Response200, GetOrdersBidsV2MetadataParam, GetOrdersBidsV2Response200, GetOrdersBidsV3MetadataParam, GetOrdersBidsV3Response200, GetOrdersBidsV4MetadataParam, GetOrdersBidsV4Response200, GetOrdersBidsV5MetadataParam, GetOrdersBidsV5Response200, GetOrdersBidsV6MetadataParam, GetOrdersBidsV6Response200, GetOrdersDepthV1MetadataParam, GetOrdersDepthV1Response200, GetOrdersExecutedV1MetadataParam, GetOrdersExecutedV1ResponseDefault, GetOrdersUsersUserTopbidsV1MetadataParam, GetOrdersUsersUserTopbidsV1Response200, GetOrdersUsersUserTopbidsV2MetadataParam, GetOrdersUsersUserTopbidsV2Response200, GetOrdersUsersUserTopbidsV3MetadataParam, GetOrdersUsersUserTopbidsV3Response200, GetOrdersUsersUserTopbidsV4MetadataParam, GetOrdersUsersUserTopbidsV4Response200, GetOrdersV1MetadataParam, GetOrdersV1Response200, GetOrdersV2MetadataParam, GetOrdersV2Response200, GetOwnersCommoncollectionsV1MetadataParam, GetOwnersCommoncollectionsV1Response200, GetOwnersCrosscollectionsV1MetadataParam, GetOwnersCrosscollectionsV1Response200, GetOwnersV1MetadataParam, GetOwnersV1Response200, GetOwnersV2MetadataParam, GetOwnersV2Response200, GetPendingtxsTokensV1MetadataParam, GetPendingtxsTokensV1Response200, GetRedirectCollectionsCollectionImageV1MetadataParam, GetRedirectCollectionsCollectionImageV1ResponseDefault, GetRedirectCurrencyAddressIconV1MetadataParam, GetRedirectCurrencyAddressIconV1ResponseDefault, GetRedirectLogoV1MetadataParam, GetRedirectLogoV1ResponseDefault, GetRedirectSourcesSourceLogoV2MetadataParam, GetRedirectSourcesSourceLogoV2ResponseDefault, GetRedirectSourcesSourceTokensTokenLinkV2MetadataParam, GetRedirectSourcesSourceTokensTokenLinkV2ResponseDefault, GetRedirectTokenV1MetadataParam, GetRedirectTokenV1ResponseDefault, GetRedirectTokensTokenImageV1MetadataParam, GetRedirectTokensTokenImageV1ResponseDefault, GetSalesBulkV1MetadataParam, GetSalesBulkV1Response200, GetSalesV1MetadataParam, GetSalesV1Response200, GetSalesV2MetadataParam, GetSalesV2Response200, GetSalesV3MetadataParam, GetSalesV3Response200, GetSalesV4MetadataParam, GetSalesV4Response200, GetSalesV5MetadataParam, GetSalesV5Response200, GetSalesV6MetadataParam, GetSalesV6Response200, GetSearchActivitiesV1MetadataParam, GetSearchActivitiesV1Response200, GetSearchCollectionsV1MetadataParam, GetSearchCollectionsV1Response200, GetSearchCollectionsV2MetadataParam, GetSearchCollectionsV2Response200, GetSearchCollectionsV3MetadataParam, GetSearchCollectionsV3Response200, GetSourcesV1MetadataParam, GetSourcesV1Response200, GetStatsV1MetadataParam, GetStatsV1Response200, GetStatsV2MetadataParam, GetStatsV2Response200, GetSyncAsksV1MetadataParam, GetSyncAsksV1Response200, GetTokensBootstrapV1MetadataParam, GetTokensBootstrapV1Response200, GetTokensDetailsV2MetadataParam, GetTokensDetailsV2Response200, GetTokensDetailsV3MetadataParam, GetTokensDetailsV3Response200, GetTokensDetailsV4MetadataParam, GetTokensDetailsV4Response200, GetTokensFlagChangesV1MetadataParam, GetTokensFlagChangesV1Response200, GetTokensFloorV1MetadataParam, GetTokensFloorV1Response200, GetTokensIdsV1MetadataParam, GetTokensIdsV1Response200, GetTokensTokenActivityV1MetadataParam, GetTokensTokenActivityV1Response200, GetTokensTokenActivityV2MetadataParam, GetTokensTokenActivityV2Response200, GetTokensTokenActivityV3MetadataParam, GetTokensTokenActivityV3Response200, GetTokensTokenActivityV4MetadataParam, GetTokensTokenActivityV4Response200, GetTokensTokenActivityV5MetadataParam, GetTokensTokenActivityV5Response200, GetTokensV1MetadataParam, GetTokensV1Response200, GetTokensV2MetadataParam, GetTokensV2Response200, GetTokensV3MetadataParam, GetTokensV3Response200, GetTokensV4MetadataParam, GetTokensV4Response200, GetTokensV5MetadataParam, GetTokensV5Response200, GetTokensV6MetadataParam, GetTokensV6Response200, GetTokensV7MetadataParam, GetTokensV7Response200, GetTransactionsTxhashSyncedV1MetadataParam, GetTransactionsTxhashSyncedV1Response200, GetTransfersBulkV1MetadataParam, GetTransfersBulkV1Response200, GetTransfersBulkV2MetadataParam, GetTransfersBulkV2Response200, GetTransfersV2MetadataParam, GetTransfersV2Response200, GetTransfersV3MetadataParam, GetTransfersV3Response200, GetTransfersV4MetadataParam, GetTransfersV4Response200, GetUsersActivityV2MetadataParam, GetUsersActivityV2Response200, GetUsersActivityV3MetadataParam, GetUsersActivityV3Response200, GetUsersActivityV4MetadataParam, GetUsersActivityV4Response200, GetUsersActivityV5MetadataParam, GetUsersActivityV5Response200, GetUsersActivityV6MetadataParam, GetUsersActivityV6Response200, GetUsersUserActivityV1MetadataParam, GetUsersUserActivityV1Response200, GetUsersUserBidsV1MetadataParam, GetUsersUserBidsV1Response200, GetUsersUserCollectionsV1MetadataParam, GetUsersUserCollectionsV1Response200, GetUsersUserCollectionsV2MetadataParam, GetUsersUserCollectionsV2Response200, GetUsersUserCollectionsV3MetadataParam, GetUsersUserCollectionsV3Response200, GetUsersUserCollectionsV4MetadataParam, GetUsersUserCollectionsV4Response200, GetUsersUserPositionsV1MetadataParam, GetUsersUserPositionsV1Response200, GetUsersUserTokensV10MetadataParam, GetUsersUserTokensV10Response200, GetUsersUserTokensV1MetadataParam, GetUsersUserTokensV1Response200, GetUsersUserTokensV2MetadataParam, GetUsersUserTokensV2Response200, GetUsersUserTokensV3MetadataParam, GetUsersUserTokensV3Response200, GetUsersUserTokensV4MetadataParam, GetUsersUserTokensV4Response200, GetUsersUserTokensV5MetadataParam, GetUsersUserTokensV5Response200, GetUsersUserTokensV6MetadataParam, GetUsersUserTokensV6Response200, GetUsersUserTokensV7MetadataParam, GetUsersUserTokensV7Response200, GetUsersUserTokensV8MetadataParam, GetUsersUserTokensV8Response200, GetUsersUserTokensV9MetadataParam, GetUsersUserTokensV9Response200, PostAdminApikeysMetricsFormDataParam, PostAdminApikeysMetricsMetadataParam, PostAdminApikeysMetricsResponse200, PostAdminCalcrarityBodyParam, PostAdminCalcrarityMetadataParam, PostAdminCalcrarityResponseDefault, PostAdminCreateratelimitruleBodyParam, PostAdminCreateratelimitruleMetadataParam, PostAdminCreateratelimitruleResponseDefault, PostAdminDeleteratelimitruleBodyParam, PostAdminDeleteratelimitruleMetadataParam, PostAdminDeleteratelimitruleResponseDefault, PostAdminFixblocksBodyParam, PostAdminFixblocksMetadataParam, PostAdminFixblocksResponseDefault, PostAdminFixcacheBodyParam, PostAdminFixcacheMetadataParam, PostAdminFixcacheResponseDefault, PostAdminFixordersBodyParam, PostAdminFixordersMetadataParam, PostAdminFixordersResponseDefault, PostAdminFixtokencacheBodyParam, PostAdminFixtokencacheMetadataParam, PostAdminFixtokencacheResponseDefault, PostAdminIndexmetadataBodyParam, PostAdminIndexmetadataMetadataParam, PostAdminIndexmetadataResponseDefault, PostAdminPauserabbitqueueBodyParam, PostAdminPauserabbitqueueMetadataParam, PostAdminPauserabbitqueueResponseDefault, PostAdminRefreshcollectionBodyParam, PostAdminRefreshcollectionMetadataParam, PostAdminRefreshcollectionResponseDefault, PostAdminRefreshtokenBodyParam, PostAdminRefreshtokenMetadataParam, PostAdminRefreshtokenResponseDefault, PostAdminResumerabbitqueueBodyParam, PostAdminResumerabbitqueueMetadataParam, PostAdminResumerabbitqueueResponseDefault, PostAdminResyncapikeyBodyParam, PostAdminResyncapikeyMetadataParam, PostAdminResyncapikeyResponseDefault, PostAdminResyncflooreventsBodyParam, PostAdminResyncflooreventsMetadataParam, PostAdminResyncflooreventsResponseDefault, PostAdminResyncnftbalancesBodyParam, PostAdminResyncnftbalancesMetadataParam, PostAdminResyncnftbalancesResponseDefault, PostAdminResyncsaleroyaltiesBodyParam, PostAdminResyncsaleroyaltiesMetadataParam, PostAdminResyncsaleroyaltiesResponseDefault, PostAdminResyncsourceBodyParam, PostAdminResyncsourceMetadataParam, PostAdminResyncsourceResponseDefault, PostAdminResyncuserbalanceBodyParam, PostAdminResyncuserbalanceMetadataParam, PostAdminResyncuserbalanceResponseDefault, PostAdminRetryrabbitqueueBodyParam, PostAdminRetryrabbitqueueMetadataParam, PostAdminRetryrabbitqueueResponseDefault, PostAdminRevalidatemintBodyParam, PostAdminRevalidatemintMetadataParam, PostAdminRevalidatemintResponseDefault, PostAdminRevalidateorderBodyParam, PostAdminRevalidateorderMetadataParam, PostAdminRevalidateorderResponseDefault, PostAdminRoutersBodyParam, PostAdminRoutersMetadataParam, PostAdminRoutersResponseDefault, PostAdminSetcommunityBodyParam, PostAdminSetcommunityMetadataParam, PostAdminSetcommunityResponseDefault, PostAdminSetindexingmethodBodyParam, PostAdminSetindexingmethodMetadataParam, PostAdminSetindexingmethodResponseDefault, PostAdminSyncdailyvolumesBodyParam, PostAdminSyncdailyvolumesMetadataParam, PostAdminSyncdailyvolumesResponseDefault, PostAdminSynceventsBodyParam, PostAdminSynceventsMetadataParam, PostAdminSynceventsResponseDefault, PostAdminTriggerjobBodyParam, PostAdminTriggerjobMetadataParam, PostAdminTriggerjobResponseDefault, PostAdminTriggerrabbitjobBodyParam, PostAdminTriggerrabbitjobMetadataParam, PostAdminTriggerrabbitjobResponseDefault, PostAdminUpdateapikeyBodyParam, PostAdminUpdateapikeyMetadataParam, PostAdminUpdateapikeyResponseDefault, PostAdminUpdateimageversionBodyParam, PostAdminUpdateimageversionMetadataParam, PostAdminUpdateimageversionResponseDefault, PostAdminUpdateratelimitruleBodyParam, PostAdminUpdateratelimitruleMetadataParam, PostAdminUpdateratelimitruleResponseDefault, PostAdminUpdatesourceBodyParam, PostAdminUpdatesourceMetadataParam, PostAdminUpdatesourceResponseDefault, PostApikeysFormDataParam, PostApikeysMetadataParam, PostApikeysResponse200, PostCollectionsCollectionOverrideV1BodyParam, PostCollectionsCollectionOverrideV1MetadataParam, PostCollectionsCollectionOverrideV1Response200, PostCollectionsDisablemetadataV1BodyParam, PostCollectionsDisablemetadataV1MetadataParam, PostCollectionsDisablemetadataV1Response200, PostCollectionsNsfwstatusV1BodyParam, PostCollectionsNsfwstatusV1MetadataParam, PostCollectionsNsfwstatusV1Response200, PostCollectionsRefreshV1BodyParam, PostCollectionsRefreshV1MetadataParam, PostCollectionsRefreshV1Response200, PostCollectionsRefreshV2BodyParam, PostCollectionsRefreshV2MetadataParam, PostCollectionsRefreshV2Response200, PostCollectionsSpamstatusV1BodyParam, PostCollectionsSpamstatusV1MetadataParam, PostCollectionsSpamstatusV1Response200, PostCollectionssetsV1BodyParam, PostCollectionssetsV1Response200, PostContractssetsV1BodyParam, PostContractssetsV1Response200, PostExecuteAuthsignatureV1BodyParam, PostExecuteAuthsignatureV1MetadataParam, PostExecuteAuthsignatureV1Response200, PostExecuteBidV4BodyParam, PostExecuteBidV4Response200, PostExecuteBidV5BodyParam, PostExecuteBidV5Response200, PostExecuteBuyV5BodyParam, PostExecuteBuyV5Response200, PostExecuteBuyV6BodyParam, PostExecuteBuyV6Response200, PostExecuteBuyV7BodyParam, PostExecuteBuyV7Response200, PostExecuteCallV1BodyParam, PostExecuteCallV1Response200, PostExecuteCancelV3BodyParam, PostExecuteCancelV3Response200, PostExecuteCancelsignatureV1BodyParam, PostExecuteCancelsignatureV1MetadataParam, PostExecuteCancelsignatureV1Response200, PostExecuteDepositV1BodyParam, PostExecuteDepositV1Response200, PostExecuteListV4BodyParam, PostExecuteListV4Response200, PostExecuteListV5BodyParam, PostExecuteListV5Response200, PostExecuteMintV1BodyParam, PostExecuteMintV1Response200, PostExecutePermitsignatureV1BodyParam, PostExecutePermitsignatureV1MetadataParam, PostExecutePermitsignatureV1Response200, PostExecutePresignatureV1BodyParam, PostExecutePresignatureV1MetadataParam, PostExecutePresignatureV1Response200, PostExecuteResultsV1BodyParam, PostExecuteResultsV1Response200, PostExecuteSellV6BodyParam, PostExecuteSellV6Response200, PostExecuteSellV7BodyParam, PostExecuteSellV7Response200, PostExecuteSolveCapacityV1BodyParam, PostExecuteSolveCapacityV1Response200, PostExecuteSolveV1BodyParam, PostExecuteSolveV1MetadataParam, PostExecuteSolveV1Response200, PostExecuteStatusV1BodyParam, PostExecuteStatusV1Response200, PostExecuteTransferV1BodyParam, PostExecuteTransferV1Response200, PostManagementCosignersV1BodyParam, PostManagementCosignersV1Response200, PostManagementMintsSimulateV1BodyParam, PostManagementMintsSimulateV1Response200, PostManagementOrdersSimulateV1BodyParam, PostManagementOrdersSimulateV1Response200, PostOrderV2BodyParam, PostOrderV2MetadataParam, PostOrderV2Response200, PostOrderV3BodyParam, PostOrderV3MetadataParam, PostOrderV3Response200, PostOrderV4BodyParam, PostOrderV4MetadataParam, PostOrderV4Response200, PostOrdersInvalidateV1BodyParam, PostOrdersInvalidateV1MetadataParam, PostOrdersInvalidateV1ResponseDefault, PostOrdersV1BodyParam, PostOrdersV1MetadataParam, PostOrdersV1ResponseDefault, PostSeaportOffersBodyParam, PostSeaportOffersResponseDefault, PostTokensDisablemetadataV1BodyParam, PostTokensDisablemetadataV1MetadataParam, PostTokensDisablemetadataV1Response200, PostTokensFlagV1BodyParam, PostTokensFlagV1Response200, PostTokensNsfwstatusV1BodyParam, PostTokensNsfwstatusV1MetadataParam, PostTokensNsfwstatusV1Response200, PostTokensRefreshV1BodyParam, PostTokensRefreshV1Response200, PostTokensRefreshV2BodyParam, PostTokensRefreshV2Response200, PostTokensSimulatefloorV1BodyParam, PostTokensSimulatefloorV1Response200, PostTokensSimulatetopbidV1BodyParam, PostTokensSimulatetopbidV1Response200, PostTokensSpamstatusV1BodyParam, PostTokensSpamstatusV1MetadataParam, PostTokensSpamstatusV1Response200, PostTokensetsV1BodyParam, PostTokensetsV1Response200, PostTokensetsV2BodyParam, PostTokensetsV2Response200, PutCollectionsCollectionCommunityV1BodyParam, PutCollectionsCollectionCommunityV1MetadataParam, PutCollectionsCollectionCommunityV1Response200 } from './types';
