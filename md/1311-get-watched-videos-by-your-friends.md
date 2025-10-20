### Leetcode 1311 (Medium): Get Watched Videos by Your Friends [Practice](https://leetcode.com/problems/get-watched-videos-by-your-friends)

### Description  
Given a list of users, their list of watched videos, and a friends graph, along with a user ID and a distance level, return an ordered list of videos watched by the user's friends at exactly that friendship distance level. The list should be sorted by the frequency of video watched (ascending), and then lexicographically by video name if frequencies are equal.

### Examples  
**Example 1:**  
Input: `watchedVideos = [["A","B"],["C"],["B","C"],["D"]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 1`  
Output: `["B","C"]`  
*Explanation: id=0, level 1 friends: [1,2], both have watched ['C'] and ['B', 'C']; frequencies: B:1, C:2. Sorted result: ["B","C"]*

**Example 2:**  
Input: `watchedVideos = [["A","B"],["C"],["B","C"],["D"]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 2`  
Output: `["D"]`  
*Explanation: id=0, level 2 friends: [3]; friend 3 watched ['D']. Only video 'D' is there.*

**Example 3:**  
Input: `watchedVideos = [["a"],["b"],["a","c"],["d","a"]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 2, level = 1`  
Output: `["a","b","d"]`  
*Explanation: id=2, level 1 friends: [0,3], videos: [a,b] and [d,a]; a:2, b:1, d:1. Sorted by freq, then name: ["b","d","a"]*

### Thought Process (as if you’re the interviewee)  
To get friends at a specific friendship level, I would use BFS traversal starting from the given user, level by level. While traversing, keep track of visited users to avoid revisiting. When the correct level is reached, collect all their watched videos, count the frequencies (use hashmap), then sort videos by frequency, then lex.

### Corner cases to consider  
- User has no friends at the given level.
- User is friends with themselves (avoid cycles).
- Videos with the same frequency, check lexicographic.
- Watched video lists may be empty.
- Multiple users with overlapping watched videos.

### Solution

```python
from collections import deque, Counter
def watchedVideosByFriends(watchedVideos, friends, id, level):
    n = len(friends)
    visited = set([id])
    q = deque([id])
    for _ in range(level):
        next_q = deque()
        while q:
            curr = q.popleft()
            for f in friends[curr]:
                if f not in visited:
                    visited.add(f)
                    next_q.append(f)
        q = next_q
    # q now contains users at desired level
    freq = Counter()
    for friend_id in q:
        for v in watchedVideos[friend_id]:
            freq[v] += 1
    # Sort by frequency, then name
    return sorted(freq.keys(), key=lambda x: (freq[x], x))
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N + F + V log V), with N=users, F=edges, V=#unique videos among friends at level.
- **Space Complexity:** O(N + V), for visited/user queue and video counters.

### Potential follow-up questions (as if you’re the interviewer)  
- How to optimize for large friend graphs?  
  *Hint: Avoid full graph traversals, use early exit or pruning.*

- Can the sort be more efficient if frequencies are bounded?  
  *Hint: Use bucket sort on frequencies, only sort lex within bucket.*

- How to handle streaming updates to watched videos or friend links?  
  *Hint: Need incremental or on-demand recomputation.*

### Summary
This problem combines BFS for graph level traversal with grouping and multi-key sorting. It is a canonical example of layered traversal in social graphs and aggregation/sorting for analytics, and uses common coding graph- and counting-patterns.


### Flashcard
Use BFS to find all friends at the given level, collect their watched videos, count frequencies, then sort by frequency and lex order.

### Tags
Array(#array), Hash Table(#hash-table), Breadth-First Search(#breadth-first-search), Graph(#graph), Sorting(#sorting)

### Similar Problems
