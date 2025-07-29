### Leetcode 888 (Easy): Fair Candy Swap [Practice](https://leetcode.com/problems/fair-candy-swap)

### Description  
We are given two integer arrays where each array represents the sizes of candy bars owned by Alice and Bob. Each person wants to exchange one candy bar with the other. The goal is to find a pair (one from Alice, one from Bob) so that after the exchange, both Alice and Bob have the same total amount of candy.

### Examples  

**Example 1:**  
Input: `aliceSizes = [1,1], bobSizes = [2,2]`  
Output: `[1,2]`  
*Explanation: Alice swaps a 1 and Bob swaps a 2. Then both have `[1,2]` with a total of 3.*

**Example 2:**  
Input: `aliceSizes = [1,2,5], bobSizes = [2,4]`  
Output: `[5,4]`  
*Explanation: Alice swaps 5 and Bob swaps 4. New totals: Alice `[1,2,4]` = 7, Bob `[2,5]` = 7. Totals match.*

**Example 3:**  
Input: `aliceSizes = [2], bobSizes = [1,3]`  
Output: `[2,3]`  
*Explanation: Alice swaps 2 and Bob swaps 3. New totals: Alice `[3]`, Bob `[1,2]`, both sum to 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible pairs between Alice and Bob; swap them and check if the total sums match. This is O(n × m), which is inefficient with larger inputs.

- **Observation:**  
  Let sumA = total for Alice, sumB = total for Bob.  
  After swapping candy a (from Alice) with candy b (from Bob):  
  New sums:  
  - Alice gets sumA - a + b  
  - Bob gets sumB - b + a  
  Set these equal: sumA - a + b = sumB - b + a  
  Simplifies to: a - b = (sumA - sumB) / 2  
  So, for a fair swap, there must be a pair (a, b) such that a = b + (sumA - sumB) / 2.

- **Optimization:**  
  - Compute sumA and sumB.
  - Precompute the target offset difference d = (sumA - sumB) // 2.
  - Store Bob’s sizes in a set for O(1) lookup.
  - For every candy a in Alice, if b = a - d exists in Bob's set, return [a, b].

- **Trade-off:**  
  This approach lowers time complexity to O(n + m), using extra space for the set.

### Corner cases to consider  
- Arrays of length 1 (single candy each)
- Identical arrays
- Arrays with duplicate values
- Arrays where only one valid swap exists
- Minimum and maximum candy sizes (e.g., size 1 or large values)

### Solution

```python
def fairCandySwap(aliceSizes, bobSizes):
    # Compute total sum of candies for Alice and Bob
    sumA = sum(aliceSizes)
    sumB = sum(bobSizes)
    # The difference that needs to be compensated for
    d = (sumA - sumB) // 2
    # Build a set for fast lookup for Bob's sizes
    bob_set = set(bobSizes)
    # Try each value in Alice's candies to find a suitable one
    for a in aliceSizes:
        b = a - d  # the matching value in Bob's candies
        if b in bob_set:
            return [a, b]
    # No solution will never happen as per the problem statement
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m)  
  Compute sums in O(n) and O(m).  
  Set construction O(m).  
  Single pass through Alice’s array O(n) with O(1) lookup for Bob's values.

- **Space Complexity:** O(m)  
  Storing all of Bob’s candy sizes in a set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to list all possible fair swaps, not just one?
  *Hint: Store and return all (a, b) pairs, not just the first match.*

- How would you handle the case where more than one swap is allowed?
  *Hint: Consider backtracking or DP to maximize the number of valid swaps.*

- What if the constraint is to minimize the absolute difference after a swap?
  *Hint: Try a variation of two-pointer or greedy after sorting arrays.*

### Summary  
This problem boils down to finding two values whose difference matches a precomputed fixed value. The solution uses the **set lookup pattern** for fast membership checking, which is common in “find pairs with sum/difference” problems. This pattern is widely applicable in array and hash-set based interview questions.