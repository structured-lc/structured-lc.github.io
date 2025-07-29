### Leetcode 1431 (Easy): Kids With the Greatest Number of Candies [Practice](https://leetcode.com/problems/kids-with-the-greatest-number-of-candies)

### Description  
You are given an array of integers where each element represents the number of **candies** each child currently has. You are also given an integer **extraCandies**. The task is to determine—for every kid—whether giving them all of the extraCandies will make them *have the greatest number of candies among all kids* (i.e., at least as many as any other kid). Output an array of booleans indicating, for each kid, if this is possible. Multiple kids can have the greatest number after receiving extraCandies.

### Examples  

**Example 1:**  
Input: `candies = [2,3,5,1,3], extraCandies = 3`  
Output: `[True, True, True, False, True]`  
*Explanation: The maximum candies any kid currently has is 5. If you give each kid 3 extra:*  
- 2+3=5 (equal to max) → True  
- 3+3=6 (>max) → True  
- 5+3=8 (>max) → True  
- 1+3=4 (<max) → False  
- 3+3=6 (>max) → True  

**Example 2:**  
Input: `candies = [4,2,1,1,2], extraCandies = 1`  
Output: `[True, False, False, False, False]`  
*Explanation: Max is 4. Only first kid can reach the max (4+1=5 ≥ 4). Others: 2+1=3, 1+1=2, etc., which are all < 4.*

**Example 3:**  
Input: `candies = [12,1,12], extraCandies = 10`  
Output: `[True, False, True]`  
*Explanation: Max is 12. First kid: 12+10=22 (True), second: 1+10=11 (False), third: 12+10=22 (True).*

### Thought Process (as if you’re the interviewee)  
Start by finding the **maximum** number of candies any child currently has.  
For each kid, add `extraCandies` to their `candies` count, and check if this value is **at least as large** as the previously computed max. If yes, mark True for this kid; otherwise, mark False.

- **Brute-force**: For each kid, simulate giving extraCandies and compare with all other kids' counts to check if result is >= all.  
- **Optimization**: Instead of multiple scans, realize you only need to find the current maximum one time (O(n)), then check for each kid (O(n)), making the solution more efficient.

Trade-off: Two passes, but both linear and straightforward. No need for additional data structures beyond the output array.

### Corner cases to consider  
- All elements of candies are the same.
- candies has only one kid.
- extraCandies is 0.
- extraCandies is very large (all kids can surpass original max).
- candies contains 0.
- Empty candies array (should clarify with interviewer; usually assume at least 1 kid).

### Solution

```python
def kidsWithCandies(candies, extraCandies):
    # Step 1: Find the current greatest number of candies among all children.
    max_candies = max(candies)
    
    # Step 2: For each kid, check if giving them all extraCandies
    # makes their new total >= current max.
    result = []
    for candy in candies:
        result.append(candy + extraCandies >= max_candies)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), where n is the number of children.  
  - Finding the max in the array is O(n).
  - For each candy count, one comparison and addition: O(n).
- **Space Complexity:**  
  O(n), for the output boolean array (one per kid).  
  - No extra storage except the result array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to do this for multiple queries with different extraCandies efficiently?  
  *Hint: Can you pre-process or use prefix/suffix arrays?*

- Suppose the candies array is very large and you want to minimize additional space.  
  *Hint: Consider in-place updates or yielding booleans.*

- Can you extend this to return the indices of those who tie for the max after distributing extraCandies?  
  *Hint: Instead of booleans, return a list of indices.*

### Summary
This is a textbook example of the **prefix/max-scan** coding pattern—find an aggregate value (here, max) and compare each element to it under some transformation. This approach is widely useful in problems that ask if an element can become maximal/minimal after some change, or for problems involving ranking and comparisons in arrays. The logic is direct and efficient with a single pass for aggregation and one for evaluation.