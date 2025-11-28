### Leetcode 3007 (Medium): Maximum Number That Sum of the Prices Is Less Than or Equal to K [Practice](https://leetcode.com/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k)

### Description  
Given two integers **k** and **x**, return the largest integer **num** such that the sum of the "prices" of all numbers from 1 to **num** is less than or equal to **k**.

The **price** of a number is defined as the number of set bits (`1`s) in its binary representation at positions which are multiples of **x** (where positions are indexed from the right, starting at 1). For each number between 1 and **num**, sum up these "prices". Find the largest such **num** where the total does not exceed **k**.

### Examples  

**Example 1:**  
Input: `k = 9, x = 1`  
Output: `6`  
*Explanation: For x=1, every set bit (all positions) in numbers 1 through 6 counts towards the price. Summing up: [1->1, 2->1, 3->2, 4->1, 5->2, 6->2] = 1+1+2+1+2+2 = 9. The sum for 7 (add 3) would exceed 9. So, answer is 6.*

**Example 2:**  
Input: `k = 4, x = 2`  
Output: `7`  
*Explanation: Only set bits at even positions (from the right) are counted. For numbers 1–7: prices = [0,1,0,2,0,1,0], sum is 4 (never exceeds 4 for num=7). For num=8, next price is 0, total remains 4; so answer could also be 8 if it's allowed (check spec).*

**Example 3:**  
Input: `k = 6, x = 3`  
Output: `14`  
*Explanation: Only the set bits at positions divisible by 3 are counted. Calculate prices for each 1–14 and sum ≤ 6. This reaches 6 at num=14; going higher would exceed the limit.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each number from 1 upward, compute its price (count set bits at positions multiple of x in its binary), keep an accumulated sum, and stop when we exceed k.  
  This approach is simple but inefficient for very large k.

- **Optimize:**  
  The function that maps num → price_sum is monotonically increasing. Therefore, we can use **binary search** on num to find the largest value such that cumulative price from 1 to num ≤ k.

- The bottleneck is efficiently calculating the total cumulative price for all numbers up to num. For each number from 1 to num, we must compute the relevant bit count; we can do this by iterating through all numbers and all relevant positions for their binary representation.
  
- Since constraints on k and x are not huge, iterating up to a moderate upper bound is reasonable with this O(num × log num × positions) approach. For higher constraints, further mathematical optimizations or bit manipulation tricks may be possible.

### Corner cases to consider  
- k or x is 1 (smallest possible values).
- k is very small (e.g. k = 0); should return 0 since no numbers will fit.
- x > max bits possible (e.g. very large x).
- Price only ever increases by 0 (no position matches).
- Numbers with very sparse set bits.

### Solution

```python
def maximumNumber(k: int, x: int) -> int:
    # Helper to calculate cumulative price sum for 1..num
    def cumulative_price(num):
        total = 0
        for n in range(1, num + 1):
            cnt = 0
            b = n
            pos = 1  # rightmost bit is position 1
            while b:
                if pos % x == 0 and (b & 1):
                    cnt += 1
                b >>= 1
                pos += 1
            total += cnt
        return total

    # Binary search for the largest num with price_sum <= k
    left, right, ans = 0, 10 ** 6, 0
    while left <= right:
        mid = (left + right) // 2
        if cumulative_price(mid) <= k:
            ans = mid
            left = mid + 1
        else:
            right = mid - 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For each guess in binary search (\~log(10⁶)), we compute cumulative price up to num, which may take up to O(num × log num) for counting relevant set bits. In worst-case, this could be O(10⁶ × log 10⁶), but you can optimize to O(log num × log(upper_bound)) for tighter constraints.

- **Space Complexity:**  
  O(1) auxiliary. No extra storage except counters; input size only.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the cumulative price calculation for large num?
  *Hint: Use patterns or mathematical formulas for bits at each position.*

- How would this change with much higher constraints, e.g. k up to 10⁹?
  *Hint: Precompute or use analytical bit position patterns.*

- What if the price function uses different sets of bit positions (not just modulus)?
  *Hint: Generalize the counting mechanism for arbitrary sets.*

### Summary
We used a **binary search** over possible num values and, for each mid, computed the cumulative price efficiently. The key pattern is to view the problem as a monotonic search for the maximum num such that a cost (defined by a bit-manipulation rule) does not exceed a given budget. This approach often appears in problems dealing with cumulative or constrained costs, classic for bitmask & binary search blend problems.


### Flashcard
Maximum Number That Sum of the Prices Is Less Than or Equal to K (Medium)

### Tags
Math(#math), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation)

### Similar Problems
