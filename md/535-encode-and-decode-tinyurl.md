### Leetcode 535 (Medium): Encode and Decode TinyURL [Practice](https://leetcode.com/problems/encode-and-decode-tinyurl)

### Description  
Design an algorithm that can **encode** a long URL to a shortened version and **decode** it back. The system should act like TinyURL:  
- When given a long URL (e.g., `https://leetcode.com/problems/design-tinyurl`), it provides a much shorter unique URL (e.g., `http://tinyurl.com/4e9iAk`).
- When given the short URL, it **must return** the original long URL.

You are to implement a class with two methods:  
- `encode(longUrl)`: returns a shortened URL.
- `decode(shortUrl)`: returns the original long URL.

There are **no restrictions** on how the encode or decode functions should work, as long as the mapping is **consistent** (i.e., decode(encode(url)) == url).


### Examples  

**Example 1:**  
Input: `encode("https://leetcode.com/problems/design-tinyurl")`  
Output: `http://tinyurl.com/0`  
Explanation. The system maps the first URL to index 0. When decoding, `decode("http://tinyurl.com/0")` returns the original.

**Example 2:**  
Input: `encode("http://example.com/abc/xyz/123")`  
Output: `http://tinyurl.com/1`  
Explanation. The system gives the next unique index. Decoding returns the full original URL.

**Example 3:**  
Input:  
```
x = encode("https://a.com/longone")  
decode(x)
```
Output:  
```
"http://tinyurl.com/2"  
"https://a.com/longone"
```
Explanation. Encoding assigns a new index for each new URL. Decoding uses that index to look up the stored URL.


### Thought Process (as if you’re the interviewee)  

- **Brute force idea:**  
  For a first approach, simply store every URL in a list and use its index as the unique part of the short URL (e.g., `tinyurl.com/0`, `tinyurl.com/1`).  
  - For encoding, append the long URL to a list and return a string with the index.
  - For decoding, parse the index from the short URL and access that index in the list.

- **Map-based optimization:**  
  Alternatively, use a dictionary to map between short and long URLs, which allows for more flexibility (and randomness to prevent ‘guessable’ URLs).  
  - Generate a random string for each new URL.
  - Store both mappings: tiny → long and long → tiny, to ensure the same long URL gets the same tiny every time.

- **Trade-offs:**  
  - Using incremental indices is fast and memory-efficient, but the URLs are guessable.
  - Using random codes provides better unpredictability but requires additional collision checks.
  - For the simple Leetcode version, the index/list approach is straightforward and sufficient.


### Corner cases to consider  
- Encoding the **same URL** multiple times (should produce same/different short URL depending on requirements; for index-based, will give different).
- Decoding a **short URL** that does not exist (should be handled gracefully or assumed valid per Leetcode).
- Extremely **long original URLs**.
- Rapid successive calls (should not have race conditions).
- Unexpected URL input format (though problem assumes valid input).


### Solution

```python
class Codec:
    def __init__(self):
        # List to store URLs; index acts as the short URL's unique ID.
        self.url_list = []

    def encode(self, longUrl: str) -> str:
        # Store longUrl, return short URL with current index.
        self.url_list.append(longUrl)
        short_id = len(self.url_list) - 1
        return f"http://tinyurl.com/{short_id}"

    def decode(self, shortUrl: str) -> str:
        # Extract index and return the original URL.
        # The index is after the last '/'
        idx = int(shortUrl.split('/')[-1])
        return self.url_list[idx]
```


### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Encoding: O(1) — append to list is constant time.
  - Decoding: O(1) — access by index is constant time.

- **Space Complexity:**  
  - O(N), where N is the number of encoded URLs, as each is stored in memory.


### Potential follow-up questions (as if you’re the interviewer)  

- If the **same URL is encoded many times**, can you ensure the same short URL each time?  
  *Hint: Use a map from long URLs to their indices.*

- How would you handle **billions of URLs** such that space isn’t wasted?  
  *Hint: Store mappings in a database or use LRU eviction.*

- How to prevent users from **guessing** valid short URLs?  
  *Hint: Use randomized or hashed codes as keys rather than simple indices.*

- How do you handle **expired or deleted** URLs?  
  *Hint: Maintain expiration metadata or use a TTL (time-to-live) system.*


### Summary
The problem uses a **bijective mapping** between long and short URLs. The common approach is to store the mapping (list, hash map), with the key detail being how you generate and look up the short URL component. This is a classic case of custom hashing/mapping, and appears in other areas like ID-shortening, file deduplication, or basic URL shortening system design. The pattern is “store-and-retrieve by key.”


### Flashcard
Map long URLs to short codes using a dictionary or list index; encoding appends, decoding retrieves by index.

### Tags
Hash Table(#hash-table), String(#string), Design(#design), Hash Function(#hash-function)

### Similar Problems
