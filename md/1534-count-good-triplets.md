### Leetcode 1534 (Easy): Count Good Triplets [Practice](https://leetcode.com/problems/count-good-triplets)

### Description  
Given an array of integers `arr` and three integers `a`, `b`, and `c`, count the number of triplets (i, j, k) (with 0 ≤ i < j < k < arr.length) such that:
- |arr[i] - arr[j]| ≤ a
- |arr[j] - arr[k]| ≤ b
- |arr[i] - arr[k]| ≤ c

A "good" triplet is one where the above conditions hold. Return the total number of good triplets found.

### Examples  

**Example 1:**  
Input: `arr = [3,0,1,1,9,7]`, `a = 7`, `b = 2`, `c = 3`  
Output: `4`  
*Explanation: Good triplets are (3,0,1), (3,0,1), (3,1,1), (0,1,1) at positions (0,1,2), (0,1,3), (0,2,3), (1,2,3) respectively.*

**Example 2:**  
Input: `arr = [1,1,2,2,3]`, `a = 0`, `b = 0`, `c = 1`  
Output: `0`  
*Explanation: No triplet satisfies the required conditions.*

**Example 3:**  
Input: `arr = [1,2,3]`, `a = 10`, `b = 10`, `c = 10`  
Output: `1`  
*Explanation: Only one triplet (1,2,3) exists, it automatically satisfies all constraints.*

### Thought Process (as if you’re the interviewee)  
Start by noting that the constraints are small (arr.length ≤ 100), so brute force using three nested loops is feasible. For each possible triplet (i, j, k) with 0 ≤ i < j < k < n, check the three conditions using absolute differences. Every time all constraints are met, increment a counter.

This brute-force O(n³) approach is justified, as maximum n is 100, making up to 161700 triplets which is tractable. Optimizations (e.g., prefix sums, early pruning) are only necessary if tighter constraints are imposed, but for now, brute-force is simplest and reliable.

### Corner cases to consider  
- All array elements are equal (e.g., [7,7,7,7,7])  
- `a`, `b`, `c` are zero (only triplets with equal elements can be valid)  
- Values are at their minimum or maximum bounds (0 or 1000)  
- Array size exactly 3 (minimal valid input)  
- No possible good triplets (e.g., constraints too tight)

### Solution

```python
def countGoodTriplets(arr, a, b, c):
    n = len(arr)
    count = 0
    # Iterate over all possible triplets (i, j, k), with i < j < k
    for i in range(n - 2):                   # i from 0 to n - 3
        for j in range(i + 1, n - 1):        # j from i+1 to n - 2
            # Early pruning: check first condition
            if abs(arr[i] - arr[j]) > a:
                continue
            for k in range(j + 1, n):        # k from j+1 to n - 1
                # Check remaining two conditions
                if abs(arr[j] - arr[k]) <= b and abs(arr[i] - arr[k]) <= c:
                    count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³), where n is the length of arr. The function checks every triplet (i, j, k) for i < j < k. This is justified by the constraint n ≤ 100.
- **Space Complexity:** O(1) extra space, as only a counter variable is used and no additional data structures are required.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array length is much larger, e.g., up to 10,000?  
  *Hint: Think about pruning unnecessary checks early, or leveraging value ranges for faster lookup (e.g., prefix sums or segment trees).*

- Could you return the triplets themselves, not just their count?  
  *Hint: Instead of incrementing the count, store each valid (i, j, k) or the values (arr[i], arr[j], arr[k]) in a list.*

- How does your solution behave with negative numbers or other data types?  
  *Hint: The absolute difference logic still holds for negative numbers in Python. For large numbers or floats, consider numerical precision.*

### Summary
This problem is a classic example of enumerating combinations under constraints. The applied solution is the combinatorial/brute force pattern, leveraging the feasibility provided by small input bounds. This approach is frequently seen in problems where the search space is cubic or quadratic and constraints are tight enough for direct enumeration. Variants appear in triplet, quadruplet, and subarray counting problems in interviews and algorithms practice.


### Flashcard
Use brute force with three nested loops to count good triplets, feasible due to small input constraints.

### Tags
Array(#array), Enumeration(#enumeration)

### Similar Problems
- Count Special Quadruplets(count-special-quadruplets) (Easy)
- Number of Unequal Triplets in Array(number-of-unequal-triplets-in-array) (Easy)