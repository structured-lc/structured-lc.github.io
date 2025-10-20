### Leetcode 1847 (Hard): Closest Room [Practice](https://leetcode.com/problems/closest-room)

### Description  
Given a list of **rooms**, where each room is represented as `[roomId, size]`, and a list of **queries** as `[preferred, minSize]`, for each query find the **roomId** that:
- Has a size at least `minSize`.
- Has a room number closest to `preferred`.  
  - If multiple rooms are equally close, prefer the room with the **smaller roomId**.
- If no such room exists, return -1 for that query.
  
Return an array of answers for each query asked.

### Examples  

**Example 1:**  
Input: `rooms = [[2,3],[1,5],[3,6]], queries = [[3,3],[3,5],[1,4]]`  
Output: `[3,1,1]`  
*Explanation:  
Query 1: prefer=3, minSize=3 → Rooms: [2,3], [1,5], [3,6]. All ≥ 3. Closest to 3 is 3.  
Query 2: prefer=3, minSize=5 → Rooms: [1,5], [3,6] (≥5). Closest to 3 is 3, then 1, select 3.  
Query 3: prefer=1, minSize=4 → Only [1,5], [3,6]. Closest to 1 is 1.*

**Example 2:**  
Input: `rooms = [[1,4],[2,3],[3,5],[4,1],[5,2]], queries = [[2,3],[2,4],[2,5]]`  
Output: `[2,1,3]`  
*Explanation:  
Query 1: prefer=2, minSize=3 → Rooms: [1,4], [2,3], [3,5]. Closest to 2 is 2.  
Query 2: prefer=2, minSize=4 → Only [1,4], [3,5] (size≥4). Closest to 2: 1, then 3. Pick 1 as abs diff is smaller.*  
Query 3: prefer=2, minSize=5 → Only [3,5].*

**Example 3:**  
Input: `rooms = [[1,1],[2,1],[3,1]], queries = [[3,1],[3,3],[3,5]]`  
Output: `[3,-1,-1]`  
*Explanation:  
Query 1: All rooms size≥1, closest is 3.  
Query 2 and 3: No room with required size.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** For each query, filter rooms whose size ≥ minSize, then pick closest by roomId.  
  - Time: O(q × n), not feasible for large n/q.
- **Optimize:** Since both rooms and queries can be sorted:
  - Sort rooms descending by size.
  - Sort queries descending by minSize, keep original indices.
  - Maintain a dynamically growing set (e.g., BST) of eligible roomIds as we process queries from largest minSize down.
  - For each query, binary search in the set for roomId closest to preferred (check both ≤ and ≥).
  - This offline approach ensures each room is added at most once, and each query is binary searched, making it efficient.
- **Why this works:** Processing by minSize lets us only add rooms that become eligible as we lower the minimum size. TreeSet/SortedList keeps candidates in order for fast nearest search.

### Corner cases to consider  
- No room with size ≥ minSize: return -1.
- More than one equally close room: prefer smaller id.
- All room numbers smaller or larger than preferred.
- Only one room, multiple queries.
- Duplicate room sizes.
- Both rooms and queries arrays empty (invalid by constraints but good to check).

### Solution

```python
from bisect import bisect_left, insort

def closestRoom(rooms, queries):
    # Sort rooms by size descending
    rooms.sort(key=lambda x: -x[1])
    # Prepare queries: add their index for final answer mapping
    extended_queries = [(minSize, preferred, idx) for idx, (preferred, minSize) in enumerate(queries)]
    extended_queries.sort(reverse=True)
    
    answer = [0] * len(queries)
    candidates = []
    i = 0  # pointer into rooms
    
    for minSize, preferred, idx in extended_queries:
        # Add rooms with size >= minSize into candidates (sorted by id)
        while i < len(rooms) and rooms[i][1] >= minSize:
            insort(candidates, rooms[i][0])
            i += 1
        
        if not candidates:
            answer[idx] = -1
            continue
        
        # Binary search for position to insert preferred
        pos = bisect_left(candidates, preferred)
        closest = None
        
        # Check the candidate on the left
        if pos > 0:
            left = candidates[pos-1]
            closest = left

        # Check the candidate on the right (or exact)
        if pos < len(candidates):
            right = candidates[pos]
            # Decide between left and right
            if closest is None or abs(right - preferred) < abs(closest - preferred) or \
                (abs(right - preferred) == abs(closest - preferred) and right < closest):
                closest = right
        
        answer[idx] = closest
    return answer

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n + q log q + q log n):  
  - Sorting rooms: O(n log n); sorting queries: O(q log q)
  - Each query binary searches (log n) over candidate room ids.  
  - Each room is inserted at most once (log n insertion).
- **Space Complexity:** O(n + q):  
  - Storing up to n candidates and q answers.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle frequent **online** queries (cannot be sorted ahead)?  
  *Hint: Think about segment trees or advanced BST structures for real-time updates/search.*

- What if **room sizes and ids are not unique**?  
  *Hint: Adjust your key to include both id and size in candidates.*

- Can you extend to support **dynamic room additions/removals**?  
  *Hint: Use self-balancing BST or a library structure that supports efficient insertion/deletion/search.*

### Summary
This problem demonstrates the **offline query processing** technique paired with **binary search** and **sorted data structures**. The core pattern is sorting both rooms and queries by constraints, enabling incremental candidate collection. This approach generalizes to many problems with constraints on queries and elements, such as "interval scheduling", "hotel booking", and more, where sorting and dynamic range queries are required.


### Flashcard
Sort rooms by size, queries by minSize; use BST to maintain eligible roomIds for efficient closest lookup.

### Tags
Array(#array), Binary Search(#binary-search), Sorting(#sorting), Ordered Set(#ordered-set)

### Similar Problems
- Most Beautiful Item for Each Query(most-beautiful-item-for-each-query) (Medium)
- Minimum Time to Kill All Monsters(minimum-time-to-kill-all-monsters) (Hard)