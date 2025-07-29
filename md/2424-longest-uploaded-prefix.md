### Leetcode 2424 (Medium): Longest Uploaded Prefix [Practice](https://leetcode.com/problems/longest-uploaded-prefix)

### Description  
Design a class that simulates uploading videos with unique ids from 1 to n and efficiently tracks the longest prefix of uploaded videos: the largest integer `k` such that all videos from 1 to k have been uploaded. Each video can be uploaded in arbitrary order, and you should support two types of operations:
- `upload(video: int)`: Mark the video `video` as uploaded.
- `longest() -> int`: Return the longest contiguous prefix (from 1) of videos that have all been uploaded.

### Examples  

**Example 1:**  
Input:  
`LUPrefix(4)`  
`upload(3)`  
`longest()`  
`upload(1)`  
`longest()`  
`upload(2)`  
`longest()`  
Output:  
`0, 1, 3`  
*Explanation:  
- After uploading 3: Only video 3 has been uploaded, so the prefix is 0.  
- Upload 1: Now, video 1 is uploaded, so the prefix is 1.  
- Upload 2: Videos 1, 2, 3 are all uploaded, so the prefix becomes 3.*

**Example 2:**  
Input:  
`LUPrefix(5)`  
`upload(2)`  
`longest()`  
`upload(3)`  
`longest()`  
`upload(1)`  
`longest()`  
Output:  
`0, 0, 3`  
*Explanation:  
- Upload 2: Only video 2 is uploaded, prefix is 0 because video 1 isn't uploaded.  
- Upload 3: Only videos 2 and 3 are uploaded, still missing 1, so prefix is 0.  
- Upload 1: Now videos 1,2,3 have been uploaded, so prefix is 3.*

**Example 3:**  
Input:  
`LUPrefix(3)`  
`upload(1)`  
`upload(2)`  
`longest()`  
Output:  
`2`  
*Explanation:  
- Both 1 and 2 have been uploaded, so the prefix is 2 (video 3 hasn't been uploaded yet).*

### Thought Process (as if you’re the interviewee)  
Let's simulate uploading videos and always keep track of the longest consecutive prefix from 1.  
A brute-force approach would be, after every upload, to check in a list/array which numbers have been uploaded and iterate from 1 upwards until we find a skipped number. But this is O(n) per check, which is too slow.

The key insight is that we only care about keeping track of the next prefix extension. We can:
- Maintain a set of uploaded numbers.
- Also track a counter, `r`, which is the largest k such that all uploads from 1 to k exist.
- Whenever a new video is uploaded, check if it "closes the gap" right after the current prefix. If so, keep extending right as long as possible (i.e., as long as r + 1 is in the set). This way, both upload and longest() are efficient.

This approach is optimized versus brute-force because it avoids scanning from 1 on every longest() call, and only updates the prefix pointer when new videos are uploaded right after the current prefix.

### Corner cases to consider  
- Duplicate uploads (should be safely ignored, set handles this).
- Uploads can come in any random order.
- longest() before any video is uploaded (should return 0).
- All videos are uploaded (should return n).
- Only non-prefix videos have been uploaded (still prefix is 0).

### Solution

```python
class LUPrefix:
    def __init__(self, n: int):
        # Set to keep track of uploaded video numbers
        self.uploaded = set()
        # Right pointer for the current longest prefix
        self.r = 0

    def upload(self, video: int) -> None:
        # Mark the video as uploaded
        self.uploaded.add(video)
        # Try to extend the prefix as long as possible
        while (self.r + 1) in self.uploaded:
            self.r += 1

    def longest(self) -> int:
        # Return the current length of the prefix
        return self.r
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Constructor: O(1)  
  - `upload`: Average O(1) per operation (since each video only bumps the right pointer once).  
  - `longest`: O(1), as it just returns the pointer.

- **Space Complexity:**  
  - O(n) for the set of uploaded videos (at most n videos).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of videos n is very large (e.g., 10⁹)?
  *Hint: Can you avoid storing all IDs explicitly? Maybe use a bitset, range counter, or more compact data representation.*

- Can you support deleting videos and updating the prefix efficiently?
  *Hint: What data structures allow O(log n) interval updates/removals? (e.g., TreeSet, BST)*

- Make the interface thread-safe for concurrent uploads.
  *Hint: Consider synchronization/mutexes on state changes.*

### Summary
This approach uses prefix tracking and a set to efficiently simulate uploads and fetch the longest uploaded prefix in O(1) time per operation. The coding pattern is a sliding prefix pointer with set tracking, common in problems needing dynamic prefix/suffix updates or efficient prefix queries after random insertions. Similar ideas are useful in file streaming, segment tracking, and advancing fronts in greedy algorithms.