### Leetcode 1242 (Medium): Web Crawler Multithreaded [Practice](https://leetcode.com/problems/web-crawler-multithreaded)

### Description  
Given a `startUrl` and an `HtmlParser` interface, implement a **multi-threaded** web crawler that visits and returns all URLs belonging to the same host as the `startUrl`. 
- You may only crawl links that share the same **hostname** as `startUrl`.
- Each page's URLs can be obtained with `HtmlParser.getUrls(url)`.
- Do not crawl the same link twice.
- Assume all URLs begin with "http://" and have no port numbers or query strings.
- Return the list of URLs crawled, in any order.

### Examples  

**Example 1:**  
Input:  
`startUrl = "http://news.yahoo.com"`,  
`HtmlParser.getUrls("http://news.yahoo.com") = ["http://news.yahoo.com/news", "http://news.yahoo.com/news/topics/"]`  
Output:  
`["http://news.yahoo.com", "http://news.yahoo.com/news", "http://news.yahoo.com/news/topics/"]`  
*Explanation: Start at the root URL, visit all its links (under the same host). You do not visit any links to other hosts.*

**Example 2:**  
Input:  
`startUrl = "http://leetcode.com/problems"`  
Suppose  
`HtmlParser.getUrls("http://leetcode.com/problems") = ["http://leetcode.com/contest", "http://example.org/abc"]`  
Output:  
`["http://leetcode.com/problems", "http://leetcode.com/contest"]`  
*Explanation: Only visit `leetcode.com` pages; skip external domains such as `example.org`.*

**Example 3:**  
Input:  
`startUrl = "http://site.com"`  
Suppose  
`HtmlParser.getUrls("http://site.com") = ["http://site.com/a", "http://site.com/b", "http://site.com/b"]`  
Output:  
`["http://site.com", "http://site.com/a", "http://site.com/b"]`  
*Explanation: Even if duplicate links are found, don't crawl the same link more than once.*

### Thought Process (as if you’re the interviewee)  
First, I need to model the crawler like a graph traversal—visiting URLs (nodes) and following the links (edges).  
- The naive (but correct) approach is BFS/DFS: start from `startUrl`, explore all reachable URLs under the same host, skip those already visited.
- Since the requirement is **multi-threaded** crawling, a simple queue/stack isn’t enough.  
- For concurrent crawling, each worker/thread can fetch links from a shared work queue.  
- To safely handle visited links and the queue in a multi-threaded setting, use thread-safe structures—e.g. a `set` protected by a lock, or use thread-safe primitives (like `concurrent.futures` in Python, `synchronized` in Java).
- Only add and crawl links if they share the same hostname.
- The goal is to maximize crawling efficiency using parallelism, while not revisiting or missing any in-scope URLs.

### Corner cases to consider  
- The start URL has no links (must still return it).
- Some links returned by `getUrls` are duplicates or already visited.
- Some URLs are to other hosts and must be skipped.
- Deep link trees (long chains, wide or narrow).
- Circular references between pages (must not loop forever).
- `HtmlParser` returns empty for certain URLs.
- Only one valid URL under the host.
- All URLs are external (return just the start).

### Solution

```python
from typing import List
from concurrent.futures import ThreadPoolExecutor
from threading import Lock

# Mock interface for clarity
class HtmlParser:
    def getUrls(self, url: str) -> List[str]:
        ...

def get_hostname(url: str) -> str:
    # Extracts host from URL, assumes http:// is always present and no port/query
    return url.split('/')[2]

def crawl(startUrl: str, htmlParser: 'HtmlParser') -> List[str]:
    hostname = get_hostname(startUrl)
    visited = set()
    visited_lock = Lock()
    output = []

    def helper(url: str):
        # Only crawl if on same host
        if get_hostname(url) != hostname:
            return
        # Lock when checking and adding visited
        with visited_lock:
            if url in visited:
                return
            visited.add(url)
            output.append(url)
        # Recurse for all links on the page
        for link in htmlParser.getUrls(url):
            helper(link)

    # Run the recursive helper in a thread pool for concurrency
    with ThreadPoolExecutor(max_workers=8) as executor:
        # Seed the first crawl
        futures = [executor.submit(helper, startUrl)]
        # Wait for completion
        for f in futures:
            f.result()
    return output
```
*Notes:*
- The above uses a recursive approach. In interviews, BFS (using a thread-safe queue) can be more scalable for large graphs.
- Thread safety is managed by a `Lock` around `visited` and `output`.
- ThreadPoolExecutor is used for multi-threading.

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + E) where N is the number of unique URLs under the host, and E is the total number of links. Each link/page is fetched and processed once.
- **Space Complexity:** O(N) for the visited set and output list, potentially O(H) for thread/stack usage, with H = max depth if recursive.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you limit the number of concurrent threads for large websites to avoid overloading the server?  
  *Hint: Use a bounded thread pool or queue and tune max_workers accordingly.*

- How would you deal with pages that are slow to respond or may trigger timeouts?  
  *Hint: Add retry logic, timeouts on requests, and consider cancellation of long-running tasks.*

- What would you do if the crawler needed to discover links across multiple (but not all) domains?  
  *Hint: Accept a whitelist of allowed hostnames and check links against that.*

### Summary
This problem is a **concurrent graph traversal** limited by hostnames, requiring careful handling of shared state for thread safety.  
It’s a classic pattern useful in distributed crawling, parallel BFS/DFS, and any system that must safely discover and process connected resources in parallel.  
Key parts: parallel work queue, visited set with concurrency, hostname filtering. This pattern also appears in parallel file/tree crawlers and scalable web/graph apps.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Concurrency(#concurrency)

### Similar Problems
- Web Crawler(web-crawler) (Medium)