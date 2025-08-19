### Leetcode 2254 (Hard): Design Video Sharing Platform [Practice](https://leetcode.com/problems/design-video-sharing-platform)

### Description  
Design a video sharing platform that supports the following actions:
- **Upload:** Add a new video (string of digits). It receives the smallest available integer videoId (starting from 0). If a video is deleted, its id can be reused.
- **Remove:** Delete a video by its videoId, so its id becomes available for reuse.
- **Watch:** Given videoId, startMinute, and endMinute, return the substring of the video between those minutes (inclusive bounds).
- **Like/Dislike:** Increment likes/dislikes counts for any video.
- **Get statistics:** For a given videoId, return its number of likes, dislikes, and views.
All operations must be efficient, and you must ensure id reuse and accurate stats tracking.
  
### Examples  

**Example 1:**  
Input:  
`["VideoSharingPlatform","upload","upload","watch","like","dislike","getLikesAndDislikes","getViews"]`  
`[[],["123456"],["999"],[0,1,3],,,,]`  
Output:  
`[null,0,1,"234",null,null,[1,1],1]`  
*Explanation:*
- Uploads video "123456" → videoId=0.
- Uploads video "999" → videoId=1.
- Watching from minute 1 to 3 of video 0 → "234".
- Likes video 0 → likes=1.
- Dislikes video 0 → dislikes=1.
- Get likes/dislikes → [1,1] for video 0.
- Get views → 1 for video 0.

**Example 2:**  
Input:  
`["VideoSharingPlatform","upload","upload","remove","upload"]`  
`[[],["123"],["456"],,["789"]]`  
Output:  
`[null,0,1,null,0]`  
*Explanation:*
- Uploads "123" → videoId=0.
- Uploads "456" → videoId=1.
- Removes video 0.
- Uploads "789" uses the smallest available id → videoId=0 (id 0 reused).

**Example 3:**  
Input:  
`["VideoSharingPlatform","upload","remove","upload","remove","upload"]`  
`[[],["a"],,["b"],,["c"]]`  
Output:  
`[null,0,null,0,null,0]`  
*Explanation:*
- Uploads "a" → 0.
- Removes 0.
- Uploads "b" reuses 0.
- Removes 0.
- Uploads "c" again reuses 0.

### Thought Process (as if you’re the interviewee)  
To design this platform:
- **Video ids** must be assigned as the smallest available integer. When removed, ids are reusable.  
  Use a **min-heap** to track free ids. Keep a counter for the next available id if no ids are free.
- **Upload:** Use the free id from heap if available, else the next counter value. Store video content and stats.
- **Remove:** Mark video as deleted, push its id to free ids heap, delete its entry.
- **Watch:** Validate id exists, slice string from startMinute to endMinute (inclusive), increment a view count.
- **Like/Dislike:** Increment counters.
- **Get stats:** Return stored values.
This approach allows all operations to be O(1) or O(log n), depending on heap operations. It avoids reusing ids incorrectly and ensures accurate statistics.

### Corner cases to consider  
- Removing an already deleted video (should handle gracefully).
- Watching/liking/removing a non-existent videoId.
- EndMinute out of bounds (should safely return up to video end).
- Multiple frequent upload/removal to stress id recycling.
- Videos of zero length or extremely large.
- Simultaneous like/dislike/view updates (if concurrency is considered).

### Solution

```python
import heapq

class VideoSharingPlatform:
    def __init__(self):
        # Next id to use if heap is empty
        self.next_id = 0
        # Min-heap for reusable ids
        self.free_ids = []
        # Main storage: videoId -> video info
        self.videos = {}
        # Example: { id: { 'content': ..., 'views': ..., 'likes': ..., 'dislikes': ... } }

    def upload(self, video: str) -> int:
        # Get the smallest available id
        if self.free_ids:
            video_id = heapq.heappop(self.free_ids)
        else:
            video_id = self.next_id
            self.next_id += 1
        # Add video info
        self.videos[video_id] = {
            'content': video,
            'views': 0,
            'likes': 0,
            'dislikes': 0
        }
        return video_id

    def remove(self, videoId: int) -> None:
        # Only allow removal if video exists
        if videoId in self.videos:
            del self.videos[videoId]
            heapq.heappush(self.free_ids, videoId)

    def watch(self, videoId: int, startMinute: int, endMinute: int) -> str:
        if videoId not in self.videos:
            return ""
        # Edge: clamp endMinute
        video = self.videos[videoId]['content']
        end = min(endMinute, len(video)-1)
        self.videos[videoId]['views'] += 1
        return video[startMinute : end+1]
        
    def like(self, videoId: int) -> None:
        if videoId in self.videos:
            self.videos[videoId]['likes'] += 1
    
    def dislike(self, videoId: int) -> None:
        if videoId in self.videos:
            self.videos[videoId]['dislikes'] += 1

    def getLikesAndDislikes(self, videoId: int) -> [int,int]:
        if videoId in self.videos:
            video = self.videos[videoId]
            return [video['likes'], video['dislikes']]
        return [0,0]

    def getViews(self, videoId: int) -> int:
        if videoId in self.videos:
            return self.videos[videoId]['views']
        return 0
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `upload`: O(log n) for min-heap pop if id is reused, O(1) otherwise.
  - `remove`: O(log n) for pushing id to heap.
  - All other ops: O(1)
- **Space Complexity:**  
  - O(n) for storing video info and auxiliary data (n = active videos + number of deleted ids, at most total uploads).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle concurrent likes/dislikes/views, or scale data reliably for millions of users?  
  *Hint: Consider thread-safe counters, sharding, or atomic operations in distributed systems.*

- What if the videos themselves are very large and we want to support streaming instead of loading the whole string?  
  *Hint: Store only a reference or chunked data; support partial reads on demand.*

- How would you implement an API to list all uploaded videos sorted by some metric (e.g., views or popularity)?  
  *Hint: Keep auxiliary data structures (heaps/maps) or perform periodic batch sorting.*

### Summary
This problem combines **min-heap for id management** and typical **hashmap lookups** for object storage and statistics tracking, a pattern common in resource allocation systems such as parking slots, connection pools, or distributed ids. Efficient id recycling and auxiliary stats are both interview favorites. The coding approach is modular and can be generalized for managing any pool with reusable unique keys and per-entry stats.

### Tags
Hash Table(#hash-table), Stack(#stack), Design(#design), Ordered Set(#ordered-set)

### Similar Problems
- Tweet Counts Per Frequency(tweet-counts-per-frequency) (Medium)
- Design Browser History(design-browser-history) (Medium)
- Most Popular Video Creator(most-popular-video-creator) (Medium)