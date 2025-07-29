### Leetcode 2857 (Medium): Count Pairs of Points With Distance k [Practice](https://leetcode.com/problems/count-pairs-of-points-with-distance-k)

### Description  
We are given a list of **2D points** (coordinates), and an integer **k**.  
The **distance** between two points (x₁, y₁) and (x₂, y₂) is defined as (x₁ ⊕ x₂) + (y₁ ⊕ y₂), where ⊕ is the bitwise XOR operator.
Count the **number of unique pairs (i, j) (i < j)** whose (x₁ ⊕ x₂) + (y₁ ⊕ y₂) = k.

### Examples  

**Example 1:**  
Input: `coordinates = [[1,2],[4,2],[1,5],[1,3]], k = 2`  
Output: `2`  
Explanation:  
- Pairs: (0,3) and (2,3)  
  - (1⊕1)+(2⊕3) = 0+1=1 ≠ 2  
  - (1⊕4)+(2⊕2)=5+0=5 ≠ 2  
  - (1⊕1)+(2⊕5)=0+7=7 ≠ 2  
  - (1⊕3)+(2⊕2)=2+0=2 ✓  
  - (4⊕1)+(2⊕5)=5+7=12 ≠ 2  
  - (4⊕1)+(2⊕3)=5+1=6 ≠ 2  
  - (1⊕5)+(5⊕3)=4+6=10 ≠ 2  
  - (1⊕3)+(2⊕3)=2+1=3 ≠ 2  
  Only pairs (2,3) and (0,3) are valid.

**Example 2:**  
Input: `coordinates = [[0,0],[1,1],[2,2],[3,3]], k = 0`  
Output: `0`  
Explanation: No pairs where (x₁⊕x₂) + (y₁⊕y₂) = 0 besides identical points, which are not allowed (i < j).

**Example 3:**  
Input: `coordinates = [[0,1]], k = 1`  
Output: `0`  
Explanation: Only one point, no pairs.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - Try all pairs (i, j) with i < j, check if (x₁⊕x₂) + (y₁⊕y₂) = k.  
  - This is O(n²), which is too slow for large n.

- **Can we optimize?**  
  - Notice: for each point (x, y), for it to form a valid pair with (x₂, y₂), we need:  
    (x⊕x₂) + (y⊕y₂) = k  
  - For each possible split of k into two non-negative integers d and k-d:  
    - (x⊕x₂)=d and (y⊕y₂)=k−d  
    - x₂ = x⊕d, y₂ = y⊕(k−d)
    - So, for each point, we can look up in a hashmap (of previously seen points) how many points (x₂, y₂) satisfy these.

- **Algorithm:**  
  - For each point (x, y):
    - For d in [0, k]:
      - x₂ = x⊕d, y₂ = y⊕(k-d)
      - Look up (x₂, y₂) in counter.
      - Accumulate answer.
    - After processing current point, add it to the counter (so we only consider pairs with i < j).

- **Why is this fast?**
  - For each n point, we do up to (k+1) lookups (for every split d).
  - So the total work: O(n × k)
  - Space: up to O(n) (for hashmap).

### Corner cases to consider  
- Empty array (coordinates = []), k any value.
- Only one point (no pairs possible).
- k = 0 (only identical point pairs, which aren't allowed; should always return 0).
- Multiple points at the same location.
- Large k, no possible distance.
- Points with negative coordinates (XOR works fine for negatives in Python).
- All coordinates the same (all pairs should have distance zero).

### Solution

```python
def countPairs(coordinates, k):
    # Dictionary to store count of (x, y) tuples we've already seen
    from collections import Counter

    counter = Counter()
    ans = 0

    for x, y in coordinates:
        # For every possible d from 0 to k
        for d in range(k+1):
            x2 = x ^ d
            y2 = y ^ (k - d)
            # Add the count of this possible matching point
            ans += counter[(x2, y2)]
        # After checking, add current point to counter
        counter[(x, y)] += 1

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × (k + 1)), since for each of the n points, we do (k + 1) lookups/inserts.

- **Space Complexity:**  
  O(n), for the hash map storing counts of each coordinate already seen.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code if you wanted to count unordered pairs (i.e., do not distinguish between (i, j) and (j, i))?  
  *Hint: Consider symmetry. How would you avoid double-counting?*

- How does the solution perform if k is much larger than n?  
  *Hint: For large k, the inner loop over d may dominate. Can you optimize?*

- Can this be generalized for higher-dimensional points with the same distance metric?  
  *Hint: Try deriving a similar lookup approach for three (or more) coordinate axes.*

### Summary
This approach leverages bitwise properties and targeted hashmap lookups, making a classic **hash-based complement counting** pattern—very common for problems involving pairwise sums or differences (like "Two Sum", or distance-based pair counts).  
The key trick is “guessing” the possible partner coordinates for each split d (from 0 … k) and using a hash map to count previously seen matches efficiently. The same hashing pattern generalizes to higher-dimension XOR/bitwise pair problems and is applicable whenever you can “invert” a distance formula to recover potential partners for a pair.