### Leetcode 3015 (Medium): Count the Number of Houses at a Certain Distance I [Practice](https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-i)

### Description  
You are given three positive integers **n**, **x**, and **y**. Consider a city with houses numbered from **1** to **n**. Each adjacent pair of houses (house *i* and *i+1*) is directly connected by a street. In addition, there is one special street directly connecting house **x** and house **y**. For every possible distance **k** (where 1 ≤ k ≤ n), determine how many **ordered pairs** of houses (i, j) (with i ≠ j) require exactly **k** streets to travel from i to j—choosing the path with the minimal number of streets, possibly using the special street between **x** and **y**.


### Examples  

**Example 1:**  
Input: `n = 3, x = 1, y = 3`  
Output: `[6,0,0]`  
Explanation:  
All pairs (i, j) for i ≠ j are:
(1,2): distance 1  
(2,1): distance 1  
(1,3): distance 1 (using the special street)  
(3,1): distance 1  
(2,3): distance 1  
(3,2): distance 1  
So, 6 pairs with distance 1, 0 with distance 2 or 3.

**Example 2:**  
Input: `n = 4, x = 1, y = 3`  
Output: `[8,2,2,0]`  
Explanation:  
Pairs at each distance:
- Distance 1: (1,2), (2,1), (2,3), (3,2), (3,4), (4,3), (1,3), (3,1) (2 via shortcut, rest are adjacent)
- Distance 2: (1,4), (4,1)
- Distance 3: (2,4), (4,2)
So, 8 pairs at 1, 2 at 2, 2 at 3, 0 at 4.

**Example 3:**  
Input: `n = 4, x = 2, y = 4`  
Output: `[8,2,2,0]`  
Explanation:  
The special street now connects 2 and 4, which gives some shortcuts for certain pairs. The final counts by following the logic or calculating as above result in the same output.


### Thought Process (as if you’re the interviewee)  

- **Brute force idea:**  
  For every ordered pair of houses (*i*, *j*) where i ≠ j, calculate the shortest path length using:
    - the standard path: |i - j|  
    - the path that goes through the special street (from *i* to *x* to *y* to *j*, and vice versa)
  Use min of all these and count how many pairs have distance *k* for 1 ≤ k ≤ n.

- **Optimize:**  
  Since n can be large, brute force O(n²) may be slow. However, precomputing is tricky since the shortcut only affects certain pairs. But the pattern of minimum path distance for a fixed *i*, *j* can be quickly found:
    - direct: |i - j|
    - via special street: |i - x| + 1 + |j - y| OR |i - y| + 1 + |j - x|
  For each pair (*i*, *j*: i ≠ j), compute their minimal path as above, and count.
  There’s symmetry, but since the question is for ordered pairs, we count both (i, j) and (j, i).

- **Why this approach:**  
  There's no simple O(n) combinatorial shortcut, as every pair might be affected differently by the shortcut, but the calculation per pair is a simple min of three candidate path lengths.

- **Trade-offs:**  
  Simple code, O(n²). Because n ≤ 100 (from the constraints), O(n²) is acceptable.


### Corner cases to consider  
- n = 1: no pairs to consider  
- x = y: the shortcut is a self-loop, effectively no extra street  
- x or y at the boundaries (1 or n)  
- All houses in a straight line, shortcut does not help (if x and y are adjacent or nearly adjacent)  
- All pairs that could use the shortcut actually get a shorter path because of it


### Solution

```python
def count_of_pairs(n, x, y):
    # Adjust x and y to be 0-indexed for easier calculations
    x -= 1
    y -= 1
    # Output: result[k-1] = number of ordered pairs with distance == k
    result = [0] * n

    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            # direct path
            dist = abs(i - j)
            # path using special street (i -> x -> y -> j)
            dist_via_xy = abs(i - x) + 1 + abs(j - y)
            dist_via_yx = abs(i - y) + 1 + abs(j - x)
            min_dist = min(dist, dist_via_xy, dist_via_yx)
            result[min_dist - 1] += 1   # -1 as distances are from 1 to n-1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  There are n houses, and for each pair (i, j), calculation is O(1). Total pairs: n × n; skip i == j.

- **Space Complexity:** O(n).  
  The result array has n elements. No other significant extra storage.


### Potential follow-up questions (as if you’re the interviewer)  

- If the city has multiple special streets, how can we generalize the approach?  
  *Hint: Consider edge list and use BFS or Floyd-Warshall to find all shortest paths.*

- What if we want only unordered pairs (i, j), so (i, j) and (j, i) count as one?  
  *Hint: Limit iteration to i < j, and increase count accordingly.*

- How would you handle very large n (e.g., 10⁵), where O(n²) is too slow?  
  *Hint: Try to count number of pairs for each shortest distance mathematically instead of checking every pair.*


### Summary  
This is a classic shortest-path-pair counting problem on an augmented linear graph. The pattern involves checking all pairs and considering both direct and shortcut routes; it's an application of path minimums and simulates all pairs distance. The algorithm is brute-force but justified by small constraints (n ≤ 100). This structure and pattern frequently occur in graph and network distance/counting problems.


### Flashcard
Count the Number of Houses at a Certain Distance I (Medium)

### Tags
Breadth-First Search(#breadth-first-search), Graph(#graph), Prefix Sum(#prefix-sum)

### Similar Problems
- Walls and Gates(walls-and-gates) (Medium)