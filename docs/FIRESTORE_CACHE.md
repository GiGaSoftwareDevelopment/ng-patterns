

[Persistence not enabled (the default)](https://github.com/firebase/firebase-js-sdk/issues/7364#issuecomment-1599041526)
When `FirestoreSettings.localCache` is not set, it defaults to MemoryLocalCache. In this mode, all data downloaded by Firestore is stored in memory. If the user closes the tab then all of that information is lost. The next time they navigate to the web site they have to re-download everything.

In this mode, the web site may be safely opened in multiple tabs. Each tab will have its own independent in-memory cache and each will operate independently. For example, if tab 1 downloads a document into its in-memory cache then tab 2 accesses the same document it will re-download it into its own in-memory cache.

Note that by default the MemoryLocalCache uses a very aggressive cache invalidation strategy (MemoryEagerGarbageCollector) that can lead to re-downloading previously-downloaded documents. This is done to avoid unbounded growth of the in-memory cache. Using MemoryLruGarbageCollector instead will use a less aggressive cache invalidation strategy at the cost of a larger memory footprint.

Persistence enabled, single-tab mode
When FirestoreSettings.localCache is set to PersistentLocalCache with PersistentSingleTabManager then all data downloaded by Firestore is stored in an indexeddb database. If the user closes the tab then all of that information is persisted, and the next time they navigate to the web site they can use the previously-cached data instead of re-downloading it.

However, due to a limitation of indexeddb, only 1 tab can access a given indexeddb database; therefore, if the web site is opened in other tabs simultaneously then only one of them will get access to the indexeddb cache and the others will fall back to in-memory cache.

If all of Firestore is running in a web worker then multiple tabs to the same web site will share that web worker, effectively implementing "multi-tab mode", as described in the next section.

Persistence enabled, multi-tab mode
When FirestoreSettings.localCache is set to PersistentLocalCache with PersistentMultipleTabManager  then the behavior is the same as PersistentSingleTabManager except that if the web site is opened in multiple tabs then they all coordinate usage of the same indexeddb database for the local cache.

Using an "election" process, the tabs decide on a "primary" tab. The "primary" tab is the one that accesses the indexeddb database on behalf of the other tabs. These "elections" occur regularly and the "primary" tab can change from one tab to another, such as if one of the tabs is closed or moved to the background.

The tabs use local storage to communicate, one of the only means available for inter-tab communication. Since web workers do not support local storage, this mode will not work in web workers.
