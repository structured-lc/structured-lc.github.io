### Leetcode 2456 (Medium): Most Popular Video Creator [Practice](https://leetcode.com/problems/most-popular-video-creator)

### Description  
We are given three lists:  
- **creators**: a list of strings where creators[i] is the creator of the iᵗʰ video  
- **ids**: a list of strings where ids[i] is the ID of the iᵗʰ video  
- **views**: a list of integers where views[i] is the view count for the iᵗʰ video

We need to find all creators with the highest total view count across all their videos. For each such creator, return their name and the lexicographically smallest ID of their most viewed video. Return a list of these [creator, most_viewed_video_id] pairs.

### Examples  

**Example 1:**  
Input: `creators=["alice","bob","alice","chris"]`, `ids=["one","two","three","four"]`, `views=[5,10,5,4]`  
Output: `[["alice", "one"], ["bob", "two"]]`  
*Explanation:*
- alice has videos "one" (5 views) and "three" (5 views); total = 10
- bob has "two" (10 views); total = 10
- chris has "four" (4 views); total = 4  
The max total is 10 (alice, bob). For alice, max-view video IDs are "one", "three" (both 5); "one" is lex. smallest. For bob, "two" is only, so output `[["alice", "one"], ["bob", "two"]]`.

**Example 2:**  
Input: `creators=["alice","alice","alice"]`, `ids=["a","b","c"]`, `views=[1,2,2]`  
Output: `[["alice", "b"]]`  
*Explanation:*
- alice has videos "a" (1), "b" (2), "c" (2); total = 5
- "b" and "c" both have max views (2), lex smallest is "b".

**Example 3:**  
Input: `creators=["a","b"], ids=["x","y"], views=[4,4]`  
Output: `[["a","x"],["b","y"]]`  
*Explanation:*
- Both have one video, both have total views 4. Each picks their video as most viewed.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Aggregate all videos and views per creator using a dict. For each creator, sum total views.  
  Then, for each creator, find their video(s) with the maximum view count. In case of a tie, pick the lexicographically smallest ID.

- **Optimization:**  
  - Keep three mappings:
    - Creator → total views sum
    - Creator → highest single video view count
    - Creator → list of IDs with that highest view count

  As we scan input, update running totals and for each creator-video, if the video's view count beats current max, reset; if equal, add to list.

- **Final step:**  
  After aggregating, find overall maximum total views. For all creators with that, for each, output [creator, smallest ID with their top view count].

  **Time Complexity:** O(n), where n is number of videos.

### Corner cases to consider  
- Only one creator, one video
- Multiple creators tie on total views, but video IDs differ
- Creator's videos all have same view count and IDs differ lex order
- Videos or creators with 0 views
- Views as large as 10⁵ or as small as 0
- Longest or shortest possible creator and ID strings

### Solution

```python
def mostPopularCreator(creators, ids, views):
    # creator -> total views
    total_views = {}
    # creator -> highest single video view
    max_view = {}
    # creator -> set of video ids with that highest view
    top_videos = {}

    n = len(creators)

    for i in range(n):
        c, vid, v = creators[i], ids[i], views[i]

        # Update total views
        if c not in total_views:
            total_views[c] = 0
        total_views[c] += v

        # Update max view and best video(s) for this creator
        if c not in max_view or v > max_view[c]:
            max_view[c] = v
            top_videos[c] = [vid]
        elif v == max_view[c]:
            top_videos[c].append(vid)

    # Find highest popularity
    max_total = max(total_views.values())

    result = []
    for c in total_views:
        if total_views[c] == max_total:
            # Pick lex smallest video id among that creator's top videos
            best_id = min(top_videos[c])
            result.append([c, best_id])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We iterate through all videos only a couple of times (building hashmaps, then scanning creators), and all secondary operations (min on a handful of IDs, etc.) are trivial compared to input size.

- **Space Complexity:** O(n).  
  We use multiple hash maps with up to n entries (if each video has a unique creator), and lists storing best video IDs per creator.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if we had a billion videos?
  *Hint: Can you avoid loading all records in memory at once? MapReduce?*

- If two creators have the same total views and their video IDs tie lexicographically, can both appear in output?
  *Hint: Yes, tie logic applies independently per creator.*

- Suppose each video could belong to multiple creators, how would the logic adapt?
  *Hint: Creator-videos mapping would be a list of lists; update all involved creators per video.*

### Summary
This problem uses the classic hash map aggregation pattern: tallying totals, tracking per-group maxima, and doing a final pass to select best options per group. This approach is widely used in leaderboard-type, aggregation, and analytics coding problems. Patterns used here (grouping by key, selecting values by min/max, lexicographic tie-breaks) also commonly appear in data summarization and ranked retrieval problems.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Design Video Sharing Platform(design-video-sharing-platform) (Hard)
- Design a Food Rating System(design-a-food-rating-system) (Medium)