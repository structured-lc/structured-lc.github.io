### Leetcode 2198 (Medium): Number of Single Divisor Triplets [Practice](https://leetcode.com/problems/number-of-single-divisor-triplets)

### Description  
Given a 0-indexed array of positive integers `nums`, find the number of triplets of **distinct indices** (i, j, k) such that the sum `nums[i] + nums[j] + nums[k]` is divisible by **exactly one** of `nums[i]`, `nums[j]`, or `nums[k]`.  
You need to count all such ordered triplets.

### Examples  

**Example 1:**  
Input: `nums = [4,6,7,3,2]`  
Output: `12`  
*Explanation: Triplets like (0,3,4), (0,4,3), etc., with values [4,3,2], sum to 9 which is only divisible by 3. Similarly, triplets with values [4,7,3] sum to 14, divisible by 7 only. There are 12 such triplets including all orderings.*

**Example 2:**  
Input: `nums = [1,2,2]`  
Output: `6`  
*Explanation: Triplets (0,1,2), (0,2,1), etc., all have sum 5 which is only divisible by 1. There are 6 single divisor triplets.*

**Example 3:**  
Input: `nums = [3,3,3]`  
Output: `0`  
*Explanation: All values are 3, so sum is 9 and divisible by all of them, not just one, so there are no valid single divisor triplets.*

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to check all possible ordered triplets (i, j, k) with distinct indices, compute the sum, and check how many of `nums[i]`, `nums[j]`, and `nums[k]` divide the sum. Count them if exactly one number divides the sum.  
- This O(n³) brute-force is too slow for large n.

- Optimization:  
  - Since indices must be distinct and the divisor property depends only on the values, not their order, we can group identical numbers and count the combinations.
  - Pre-count occurrences of each unique value.
  - Enumerate unique triplets of values: (a, b, c) where a, b, c could be same or different.
  - For each triplet of values, determine if the sum is divisible by exactly one of a, b, c.
  - Count the permutations contributed by their counts:
    - All different: cnt[a] × cnt[b] × cnt[c] × 6 (because 3! orderings)
    - Two same (a,a,c): cnt[a] × (cnt[a]-1) × cnt[c] × 3 (choose the doubled spot in 3 ways)
    - All same: Not possible since all same numbers cannot have sum divisible by only one (will be 3 or 0).

- This reduces the problem to O(K³), where K is the number of distinct numbers in nums (small for typical constraints).

### Corner cases to consider  
- Array length < 3: No triplets possible.
- All numbers same: No single divisor triplet.
- Large input with only a few distinct numbers.
- Triplets where sum is not divisible by any of the three.
- Triplets where sum is divisible by more than one.

### Solution

```python
def singleDivisorTriplet(nums):
    # Count occurrences of each number
    from collections import Counter
    cnt = Counter(nums)
    values = list(cnt.keys())
    result = 0

    # Helper to check if sum is divisible by exactly one among (a, b, c)
    def check(a, b, c):
        total = a + b + c
        div_a = total % a == 0
        div_b = total % b == 0
        div_c = total % c == 0
        return (div_a + div_b + div_c) == 1

    n = len(values)
    for i in range(n):
        a = values[i]
        cnt_a = cnt[a]
        # a, b, c all different
        for j in range(i+1, n):
            b = values[j]
            cnt_b = cnt[b]
            for k in range(j+1, n):
                c = values[k]
                cnt_c = cnt[c]
                # (a,b,c)
                if check(a, b, c):
                    result += cnt_a * cnt_b * cnt_c * 6  # 3! permutations

                # (a,c,b)
                if check(a, c, b):
                    result += 0  # Already counted as (a,b,c)

                # (b,a,c)
                if check(b, a, c):
                    result += 0  # Already counted

        # two same, one different: (a,a,b)
        for j in range(n):
            b = values[j]
            if a == b or cnt[a] < 2:
                continue
            if check(a, a, b):
                result += cnt[a] * (cnt[a]-1) * cnt[b] * 3  # choose the double spot in 3 ways
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(K³), where K is the number of distinct elements in nums (since we enumerate all unique value triplets). For each unique combination, check costs O(1).
- **Space Complexity:** O(K) for the Counter and holding unique values, where K = # of unique numbers.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large input arrays efficiently?
  *Hint: Limit to counting by value, avoid O(n³) triplet loop.*

- Can you further optimize for cases where input values are bounded?  
  *Hint: Use bucket/sieve-based approach.*

- What if the array can contain negatives or zeros?  
  *Hint: Need to consider divisibility by zero and handle negatives for mod operation.*

### Summary
This problem is a good example of *counting by value* and *combinatorial enumeration* based on frequency. It requires careful case handling for same/different elements and efficiently avoids O(n³) brute-force by using the properties of numbers involved, a common approach in advanced array and counting problems. This pattern applies to problems involving triplet/group constraints dependent only on values, not positions.


### Flashcard
For all ordered triplets (i, j, k), count if exactly one of nums[i], nums[j], nums[k] divides their sum; optimize by grouping values.

### Tags
Math(#math)

### Similar Problems
- Count Array Pairs Divisible by K(count-array-pairs-divisible-by-k) (Hard)