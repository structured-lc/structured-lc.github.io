### Leetcode 3247 (Medium): Number of Subsequences with Odd Sum [Practice](https://leetcode.com/problems/number-of-subsequences-with-odd-sum)

### Description  
Given an array `nums`, count the number of **non-empty subsequences** whose sum is odd. Since the answer can be very large, return the count modulo 10⁹ + 7.   
A subsequence is any sequence derived by deleting some (possibly zero) elements, without changing the order.

### Examples  

**Example 1:**  
Input: `[1,1,1]`  
Output: `4`  
*Explanation: Odd sum subsequences: [1], [1], [1], [1,1,1] (each 1 is considered distinguishable by its position).*

**Example 2:**  
Input: `[1,2,2]`  
Output: `4`  
*Explanation: Odd sum subsequences: [1], [1,2], [1,2], [1,2,2].*

**Example 3:**  
Input: `[2,4,6]`  
Output: `0`  
*Explanation: There are no odd numbers, so no subsequence can have an odd sum.*

### Thought Process (as if you’re the interviewee)  
- A brute-force approach would be to generate all subsequences, sum their elements, and count those resulting in an odd sum. However, with array length up to 10⁵, generating all 2ⁿ subsequences is infeasible.
- Let's try to use combinatorics and invariants:
  - A single odd number forms an odd-sum subsequence.
  - If you combine an even sum with an odd, you get odd.  
  - In a prefix scan, for each number we can keep track of how many ways there are to get even/odd sums so far.
- Scan left to right, keeping two counters:  
  - **even**: Number of subsequences with an even sum so far.  
  - **odd**: Number of subsequences with an odd sum so far.  
  - For each new value:
    - If it's even:  
      - Appending it to an even sum stays even, and to an odd sum stays odd.
      - So, both even and odd counts double.
    - If it's odd:  
      - Appending to even sum gives odd, appending to odd sum gives even.
      - So, swap the even/odd counts, then double, then add 1 odd (for the new single value itself).
- Use modular arithmetic to avoid overflow.
- This is efficient (O(n)), only simple arithmetic per element.

### Corner cases to consider  
- All even numbers ⇒ answer is 0  
- All odd numbers (each element is 1)  
- Single element, either odd or even  
- Large numbers  
- Only one odd in a sea of evens  
- Input length is 1 (single element)  
- Empty input (constraints: input length ≥ 1)

### Solution

```python
def numberOfSubsequencesWithOddSum(nums):
    MOD = 10**9 + 7
    even = 0   # Counts of subsequences with even sum
    odd = 0    # Counts of subsequences with odd sum

    for num in nums:
        if num % 2 == 0:
            # Adding an even number to any sequence doesn't change odd/even parity
            even = (even * 2 + 1) % MOD
            odd = (odd * 2) % MOD
        else:
            # Adding an odd flips the parity of existing subseqs
            new_even = (even + odd) % MOD
            new_odd = (even + odd + 1) % MOD
            even, odd = new_even, new_odd

    return odd
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We process each number in the list once, doing constant work for each.
- **Space Complexity:** O(1) — Only a few integer counters are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you find the number of subsequences with an even sum?
  *Hint: Use a similar dynamic programming approach and keep track of even/odd.*

- What if negative numbers are allowed?
  *Hint: Parity rules don’t change with negatives; algorithm is unchanged.*

- Can you compute the answer if the list is modified online (add/remove at end)?
  *Hint: Requires dynamic data structure, possibly segment tree or binary indexed tree keeping parity sums over ranges.*

### Summary
The approach uses a **parity-based dynamic programming pattern** where we count subsequences with even and odd sum so far, updating with each element. It’s a classic example of **state compression DP** for counting, and this general pattern applies to any question where an invariant (like parity or mod k) in subsequences matters. The method is efficient (O(n)), robust, and avoids costly enumeration of all subsequences.