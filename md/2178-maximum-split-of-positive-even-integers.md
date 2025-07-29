### Leetcode 2178 (Medium): Maximum Split of Positive Even Integers [Practice](https://leetcode.com/problems/maximum-split-of-positive-even-integers)

### Description  
Given an integer `finalSum`, split it into the sum of the **maximum number of unique, positive, even integers**. Each integer must appear at most once in the split, must be positive, and even (e.g., 2, 4, 6, ...). Return any valid list of those even numbers adding up to `finalSum`. If it's not possible (e.g., `finalSum` is odd), return an empty list.

### Examples  

**Example 1:**  
Input: `finalSum = 12`  
Output: `[2, 4, 6]`  
*Explanation: We can split 12 as 2 + 4 + 6; this uses the largest possible count of unique even numbers (3).*

**Example 2:**  
Input: `finalSum = 28`  
Output: `[2, 4, 6, 16]`  
*Explanation: 2 + 4 + 6 = 12, remaining 16, so [2, 4, 6, 16] sums to 28 and all are unique and even.*

**Example 3:**  
Input: `finalSum = 7`  
Output: `[]`  
*Explanation: 7 is odd, so it cannot be the sum of positive even integers.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force** idea: Try all combinations of unique even integers ≤ finalSum to see which combination sums to finalSum and maximizes the count. This is extremely inefficient due to exponential combinations.
- **Greedy** approach: Since we want the largest number of unique even numbers, always start picking the smallest available ones (2, 4, 6, ...) and stop if the next candidate exceeds the remaining sum. When we cannot add a new even number, add any leftover (if positive) to the last picked number to make the total sum match finalSum.
- Why greedy works: By always picking the smallest unused even number, we maximize the quantity rather than the value, which fits the problem's goal.

### Corner cases to consider  
- finalSum is odd ⇒ return [].
- finalSum is less than 2 (like 0 or negative) ⇒ return [].
- Adding leftover to the last picked number might accidentally duplicate an already used even (but by construction, this never happens in this greedy manner).

### Solution

```python
def maximumEvenSplit(finalSum):
    # Return empty list if finalSum is odd
    if finalSum % 2 != 0 or finalSum < 2:
        return []
    
    ans = []
    curr = 2
    # Keep picking the next smallest even number while possible
    while finalSum >= curr:
        ans.append(curr)
        finalSum -= curr
        curr += 2

    # Add any leftover to the last number to reach the exact sum
    if finalSum > 0:
        ans[-1] += finalSum
    
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√n)  
  At every step, we pick the next even number, so the loop runs roughly O(√n) times (since sum of 2+4+6+...+k ≤ n).
- **Space Complexity:** O(√n)  
  The output list can be as big as O(√n) because the sum of first k even numbers grows quadratically.

### Potential follow-up questions (as if you’re the interviewer)  

- What if negative even numbers were allowed?  
  *Hint: How would this affect your process? Would you ever want to use negative numbers to maximize the count?*

- Can you return all possible maximum-sized splits, not just one?  
  *Hint: This becomes a backtracking/enumeration problem.*

- What if the numbers must be consecutive even integers?  
  *Hint: Now you must check if such a sequence exists that sums to finalSum.*

### Summary
This problem uses a **greedy** growing sequence pattern: always take the smallest available unit to maximize count under a sum constraint. It's a well-known approach for "maximum number of summands" problems where all summands must be unique and come from an ordered set. Useful in cases where maximizing count takes precedence over value, and the problem has a clear smallest unit (here, the smallest even integer ≥2).