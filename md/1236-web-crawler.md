### Leetcode 1236 (Medium): Web Crawler [Practice](https://leetcode.com/problems/web-crawler)

### Description  
Given a starting URL and access to an HtmlParser, implement a web crawler that visits every URL on the same **hostname/domain** as the starting URL. You should:
- Start with the given `startUrl`.
- Use `HtmlParser.getUrls(url)` to get all the URLs contained in the given web page.
- Only crawl URLs **with the same hostname** as `startUrl`.
- Never crawl the same URL more than once (avoid cycles/infinite crawling).
- Return all unique URLs found, in any order.

The hostname is considered as the domain and TLD only (e.g., for 'http://leetcode.com/problems', the hostname is 'leetcode.com'). Only URLs matching `startUrl`'s host should be followed.

### Examples  

**Example 1:**  
Input: `startUrl = "http://leetcode.com/problems", HtmlParser as provided`  
Output: `["http://leetcode.com/problems", "http://leetcode.com/contest", "http://leetcode.com/solution"]`  
*Explanation: All found URLs with the same host ('leetcode.com') are crawled and collected.*

**Example 2:**  
Input: `startUrl = "http://example.org/index", HtmlParser as provided`  
Output: `["http://example.org/index", "http://example.org/about"]`  
*Explanation: Even if other URLs are present on the page, only those from 'example.org' are visited once.*

**Example 3:**  
Input: `startUrl = "http://site.com/index", HtmlParser as provided`  
Output: `["http://site.com/index"]`  
*Explanation: If there are no outgoing links from the starting page, only the starting URL is returned.*

### Thought Process (as if you’re the interviewee)  
First instinct is to traverse the "web" like a graph, starting from `startUrl`, visiting neighbors (outgoing URLs) using `HtmlParser.getUrls()`. To avoid loops and redundancy, we need to track visited URLs. Since we only want URLs with the same hostname, we'll need a function to parse and compare hostnames.

Graph traversal can be done with BFS or DFS. BFS avoids deep recursion and is very readable with a queue (it keeps the memory usage predictable), though both work here since we just need to collect everything connected by same domain.

Steps:
- Extract the hostname from `startUrl`.
- Use a queue (for BFS) and a set (for visited).
- For each URL in the queue:
  - If not visited and has the correct hostname:
    - Add to visited and result.
    - For each linked URL (from that page), add to queue if not visited.
- Repeat until the queue is empty.

This ensures:
- No URL crawled twice.
- Only same-host URLs are crawled.

### Corner cases to consider  
- No outgoing links from starting page.
- Pages with links to *many* external domains.
- Cyclic links (pages linking to each other or themselves).
- Mixed case or trailing slash differences in URLs.
- All pages are already visited/only contain visited/invalid URLs.
- Empty result (e.g., invalid start URL).
- Very deep chains or wide (many outgoing URLs per page).

### Solution

```python
from urllib.parse import urlparse
from collections import deque

def crawl(startUrl, htmlParser):
    # Helper to extract domain/hostname only
    def get_host(url):
        return urlparse(url).netloc

    # Use set to avoid duplicates
    seen = set()
    queue = deque([startUrl])
    # Determine target host
    base_host = get_host(startUrl)

    while queue:
        url = queue.popleft()
        if url in seen:
            continue
        if get_host(url) != base_host:
            continue
        # Mark as visited
        seen.add(url)
        # Add all found URLs for this page to queue
        for link in htmlParser.getUrls(url):
            if link not in seen and get_host(link) == base_host:
                queue.append(link)
    # Return as list since order doesn't matter
    return list(seen)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N + E), where N = number of pages with the target hostname, E = total links encountered connecting them. Each URL from the same host is visited once, and each edge (link) at most once per host.

- **Space Complexity:**  
  O(N), for the `seen` set and queue, where N = number of URLs on the target host.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support multi-threaded crawling for efficiency?  
  *Hint: Think about shared visited set synchronization and concurrent queues.*

- What if you want to crawl all URLs, not just those with the same hostname?  
  *Hint: Remove the hostname check, but watch for unbounded crawling or irrelevant content.*

- How would you prevent, or detect, infinite or very deep recursion caused by cyclic links?  
  *Hint: Rely on the visited set—explain why it’s necessary and sufficient.*

### Summary
This problem is a classic **graph traversal** question in disguise, solved effectively with BFS and a visited set. It’s closely related to crawling or exploring nodes in any linked data structure (graphs, trees, etc). The BFS/crawling pattern applies broadly in real-world applications such as indexing, dependency scanning, or link-based viral propagation across networks.

### Tags
String(#string), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Interactive(#interactive)

### Similar Problems
- Web Crawler Multithreaded(web-crawler-multithreaded) (Medium)