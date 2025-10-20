### Leetcode 2897 (Hard): Apply Operations on Array to Maximize Sum of Squares [Practice](https://leetcode.com/problems/apply-operations-on-array-to-maximize-sum-of-squares)

### Description  
Given an array of integers `nums` and an integer `k`, you're allowed to perform as many operations as you want:  
- Choose two distinct indices i and j.
- Set nums[i] = nums[i] & nums[j], and nums[j] = nums[i] | nums[j].  
After any number of operations, select exactly `k` elements from the array.  
Return the **maximum possible sum of squares** of those `k` elements, modulo 10⁹+7.

Intuitively, since AND reduces bits and OR adds bits, you want to "merge" set bits to concentrate as many as possible in a few numbers, making some numbers large and the rest small. Your goal is to maximize the squared sum of the `k` final elements.

### Examples  

**Example 1:**  
Input: `nums = [2,6,5,8]`, `k = 2`  
Output: `261`  
Explanation:  
- Pick i=0, j=3: nums=[2&8,6,5,2|8]=[0,6,5,10]
- Pick i=2, j=3: nums=[0,6,5&10,5|10]=[0,6,0,15]
- Now nums=[0,6,0,15], pick 6 and 15: 6² + 15² = 36 + 225 = 261.

**Example 2:**  
Input: `nums = [3,8,2]`, `k = 2`  
Output: `73`  
Explanation:  
No operations improve things. Best to pick 3 and 8: 3² + 8² = 9 + 64 = 73.

**Example 3:**  
Input: `nums = [1,1,1,1,1]`, `k=3`  
Output: `3`  
Explanation:  
No way to combine to make bigger numbers. Best to use three 1s: 1² + 1² + 1² = 3.

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Try all possible sequences of allowed operations and all possible k-element choices at the end — clearly infeasible due to combinatorial explosion.

- **What is the optimal move?**  
  The AND makes numbers smaller; OR makes numbers bigger. Since you want few BIG numbers (since squaring accentuates size, it's better to have 16+0+0=16² than 8+8=8²+8²).
  
- **Key Insight:**  
  The optimal strategy is to concentrate all the set bits from the numbers into as few numbers as possible. Since AND throws away bits that do not overlap, but OR keeps all, you want to merge them to make a number that, at each bit position, has as many set bits as possible and then split those as big as possible among the k.

- **Final optimal method:**  
  - For every bit position, count how many numbers have that bit set.
  - For ‘k’ biggest numbers, to maximize sum of squares, try to assign as many ones (in total) to the highest value numbers.
  - By greedily assigning each bit (for each bit from low to high), for count of ‘cnt’ for that bit, assign that bit to the top ‘cnt’ numbers (ensure that you have ‘k’ numbers in total; build an array result[0..k-1], and for each bit, add that bit to the next ‘cnt’ numbers).

- **Implementation:**  
  - Build result[] of k zeros.
  - For each bit position, assign that bit to cnt numbers in result (spread greedily).
  - At the end, sum squares of result[].

- **Trade-offs:**  
  This greedy construction guarantees the sum of squares is maximized, as making few numbers big is always better when squaring.

### Corner cases to consider  
- k ≥ len(nums): Need to still pick exactly k, possibly padding with zeros.
- nums contains zeros, or all numbers are zero.
- All nums are the same.
- k = 1.
- Very large numbers (to ensure modulo 10⁹+7 is used correctly).

### Solution

```python
def maximumSumOfSquares(nums, k):
    MOD = 10**9 + 7
    # Result array: k numbers we'll build the big numbers in
    res = [0] * k
    
    # For each bit position, assign the 1s as spread out as possible
    for bit in range(61):  # Since up to 2^60 can occur in constraints
        count = 0  # How many numbers in nums have this bit set?
        for num in nums:
            if num & (1 << bit):
                count += 1
        # Assign this bit to as many of the largest as possible, spread to k
        for i in range(count):
            res[i % k] |= (1 << bit)
    
    # Now compute the sum of their squares
    ans = 0
    for x in res:
        ans = (ans + (x * x) % MOD) % MOD
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(61 × n + k), since we check 61 bits (for each bit, scan n numbers), and in the worst case, distribute bits into k buckets.
  
- **Space Complexity:**  
  O(k) — to store the k numbers (result array) before computing their squares.

### Potential follow-up questions (as if you’re the interviewer)  

- If `k > len(nums)`, what should the answer be?  
  *Hint: Think about padding with zeros to maintain size k.*

- What about negative numbers in the array?  
  *Hint: Would change the meaning of AND/OR assignment.*

- Can this be generalized to other operations (not just AND/OR)?  
  *Hint: Squaring boosts higher magnitude, so greedy assignment may or may not apply.*

### Summary
This problem is a classic instance of **bitwise greedy assignment**, where each bit's contribution is counted and assigned across k buckets to maximize the overall squared sum. The idea of *concentrating resource (bits, ones, or value tokens) into as few containers as possible to maximize squares/efficiency* is a recurring pattern, especially in resource distribution or combinatorial optimization. Similar logic appears in forming largest numbers, bitwise games, and maximizing convex functions of sums.


### Flashcard
Concentrate all set bits into k numbers using allowed operations to maximize sum of squares; distribute bits greedily.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Minimize OR of Remaining Elements Using Operations(minimize-or-of-remaining-elements-using-operations) (Hard)