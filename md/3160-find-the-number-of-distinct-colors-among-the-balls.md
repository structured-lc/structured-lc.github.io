### Leetcode 3160 (Medium): Find the Number of Distinct Colors Among the Balls [Practice](https://leetcode.com/problems/find-the-number-of-distinct-colors-among-the-balls)

### Description  
Given `limit` (numbered balls from 0 to limit, all uncolored initially) and a list of `queries`, where each query assigns a color `y` to ball `x`, return an array where the iᵗʰ entry is the count of **distinct colors** present **after** the iᵗʰ query (ignore uncolored balls).  
On each query, if a ball already had a color, it's replaced by the new color; if that color becomes unused (no ball holds it), it's no longer counted.

### Examples  

**Example 1:**  
Input: `limit = 4, queries = [[0, 1], [1, 2], [0, 2], [2, 3]]`  
Output: `[1, 2, 1, 2]`  
*Explanation:*
- Query 1: Ball 0 → color 1. Unique colors: {1}
- Query 2: Ball 1 → color 2. Unique colors: {1, 2}
- Query 3: Ball 0 → color 2 (was 1). Now, ball 0 and 1 both have color 2. Only {2}
- Query 4: Ball 2 → color 3. Now, balls: 0:2, 1:2, 2:3, so {2, 3}

**Example 2:**  
Input: `limit = 2, queries = [[0, 5], [1, 5], [2, 6]]`  
Output: `[1, 1, 2]`  
*Explanation:*
- Query 1: Ball 0 → color 5. Unique colors: {5}
- Query 2: Ball 1 → color 5. Both balls (0, 1) are 5. Still {5}
- Query 3: Ball 2 → color 6. Now {5, 6}

**Example 3:**  
Input: `limit = 3, queries = [[1, 9], [1, 10], [2, 10], [3, 10], [0, 10]]`  
Output: `[1, 1, 1, 1, 1]`  
*Explanation:*
- Query 1: Ball 1 → 9. Unique: {9}
- Query 2: Ball 1 → 10. Now only ball 1 has 10. {10}
- Query 3: Ball 2 → 10. Balls 1 and 2 are 10. Still {10}
- Query 4: Ball 3 → 10. Now balls 1,2,3 are 10. Still {10}
- Query 5: Ball 0 → 10. All balls now 10. Still {10}

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  After every query, scan every ball to collect distinct colors. Very slow (O(n²)) for large inputs, since each query could take O(n) time.

- **Optimized:**  
  Track:
  - The current color of each ball, e.g., with a list or dictionary.
  - For each color, the count of balls having that color, e.g., with a dictionary.
  On color change:
   - If ball was colored, decrement count of its previous color; if that count drops to zero, remove it.
   - Set ball to the new color, increment that color's count.
  - The current number of keys in the color count dictionary is the number of unique colors at that step.

  This gives O(1) update and O(1) lookup per query.

  Trade-off: Slightly more memory, but very efficient for large numbers of queries/balls.

### Corner cases to consider  
- limit = 0 (one ball only)
- All queries color the same ball
- Multiple balls switching between colors frequently
- Query with a color that's never repeated (many unique colors)
- No queries (empty queries list)
- All balls only ever uncolored
- Query colors a ball with its current color (no net change)
- Assignments that erase a previously unique color
- Colors are negative or large numbers (as long as hashable, valid)

### Solution

```python
def distinctColors(limit, queries):
    # Each ball's current color (use a dict to avoid allocating limit+1 elements if unused)
    ball_color = {}
    # Map color → count of balls currently colored with it
    color_count = {}
    result = []

    for x, y in queries:
        # If the ball had a color, decrement count for that color
        if x in ball_color:
            old_color = ball_color[x]
            color_count[old_color] -= 1
            if color_count[old_color] == 0:
                del color_count[old_color]
        # Assign the new color to ball x
        ball_color[x] = y
        color_count[y] = color_count.get(y, 0) + 1
        # Number of unique colors is just number of keys in color_count
        result.append(len(color_count))

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(q), where q = number of queries. Each query is handled in constant time: updating two hash tables and appending a result.
- **Space Complexity:** O(n + c), where n ≤ limit+1 is number of labeled balls ever used, c is number of unique colors assigned (overall, both are bounded by queries and limits; for practical inputs, this is acceptable).

### Potential follow-up questions (as if you’re the interviewer)  

- If each query could also "remove color" from a ball, how does your design change?  
  *Hint: Track removals and handle color count dropping to 0.*

- What if the colors are strings or tuples, not integers?  
  *Hint: Hash table keys can be any hashable object in Python. Approach is unchanged.*

- Suppose you wanted at any time to list the colors currently in use, not just their count?  
  *Hint: Maintain a set or use the keys of color_count.*

### Summary
This problem exemplifies a **hash map counting** pattern: use one mapping to track per-item status, and one to aggregate statistics over classes of values (here, each color's ball count).  
This is a very common approach used for efficient management of state, such as "number of distinct X in current window" (sliding window/counting problems), or dynamic class sizes.  
Learning this pattern is extremely useful for handling “distinct” or “occurrences in groups” problems in arrays, queries, or streaming data.