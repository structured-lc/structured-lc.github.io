### Leetcode 1395 (Medium): Count Number of Teams [Practice](https://leetcode.com/problems/count-number-of-teams)

### Description  
Given a list of n soldiers standing in a line, each with a unique integer rating, you must count the number of ways to form a team of 3 soldiers (indices i, j, k with 0 ≤ i < j < k < n) such that the team's ratings are either strictly increasing (rating[i] < rating[j] < rating[k]) or strictly decreasing (rating[i] > rating[j] > rating[k]). Return the total number of such teams.  
Note: Each soldier can participate in multiple teams.

### Examples  

**Example 1:**  
Input: `rating = [2,5,3,4,1]`  
Output: `3`  
Explanation: (2,3,4), (5,4,1), (5,3,1)
- Indices: (0,2,3), (1,3,4), (1,2,4).  
- All satisfy either strictly increasing or decreasing.

**Example 2:**  
Input: `rating = [2,1,3]`  
Output: `0`  
Explanation: No three indices make strictly increasing or decreasing sequences.

**Example 3:**  
Input: `rating = [1,2,3,4]`  
Output: `4`  
Explanation: Teams: (1,2,3), (1,2,4), (1,3,4), (2,3,4) -- all strictly increasing.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible triplet (i, j, k) with 0 ≤ i < j < k < n.  
  For each triplet, check if they form a valid team (strictly increasing or decreasing).  
  This is O(n³) and not efficient.

- **Optimize:**  
  Notice that every team must have a "middle" soldier (j).  
  For each middle index j, count how many i < j have rating[i] < rating[j] and how many k > j have rating[k] > rating[j]. Multiply these for "upward" teams.  
  Similarly, count how many i < j have rating[i] > rating[j] and how many k > j have rating[k] < rating[j]. Multiply these for "downward" teams.  
  This is O(n²) since for each j, we examine all soldiers before and after, but only O(n) work per j.

- **Why this works:**  
  For each possible middle, splitting the problem this way counts all valid teams involving j at the center, and avoids redundant checks compared to brute-force.  
  Space is O(1) extra (beyond input) if we just keep counters.

### Corner cases to consider  
- Array length < 3: Should return 0 (can't form a team).
- All elements strictly increasing: Only increasing teams possible.
- All elements strictly decreasing: Only decreasing teams possible.
- All elements equal: No valid teams since soldiers must have unique ratings.
- Ratings with only 1 or 2 soldiers: No possible team.

### Solution

```python
def countNumberOfTeams(rating):
    n = len(rating)
    ans = 0

    for j in range(1, n - 1):
        left_less = left_greater = 0
        right_less = right_greater = 0

        # Count to the left of j
        for i in range(j):
            if rating[i] < rating[j]:
                left_less += 1
            elif rating[i] > rating[j]:
                left_greater += 1

        # Count to the right of j
        for k in range(j + 1, n):
            if rating[k] < rating[j]:
                right_less += 1
            elif rating[k] > rating[j]:
                right_greater += 1

        # Combine for both increasing and decreasing triplets
        ans += left_less * right_greater + left_greater * right_less

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). For each of the (n-2) "middle" indices, we scan O(n) elements to the left and right.
- **Space Complexity:** O(1) extra (not counting input), since we only use counters. Input does not require extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- If the ratings can repeat, how do you handle non-unique ratings?  
  *Hint: Clarify whether strictly increasing/decreasing still applies if equal elements are present.*

- Can you solve this in O(n log n) or better?  
  *Hint: Explore Binary Indexed Trees or Segment Trees for prefix/suffix counting.*

- How would you generalize for teams of size greater than 3?  
  *Hint: Combination counting or dynamic programming for k-length subsequences.*

### Summary
This is a classic application of the “count by middle” or “fix one and count on both sides” pattern, a common trick in combinatorial array questions where element order matters. The approach leverages counting to build O(n²) on top of brute-force O(n³). This strategy is broadly applicable in problems about triplets with given properties, e.g., “number of triangles,” “count inversions,” and is a stepping stone to more advanced pair-counting with data structures (Fenwick/BIT/Segment trees) for O(n log n) solutions.


### Flashcard
For each middle index j, count valid i < j and k > j pairs; sum upward and downward teams.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
