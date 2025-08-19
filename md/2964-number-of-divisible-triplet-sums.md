### Leetcode 2964 (Medium): Number of Divisible Triplet Sums [Practice](https://leetcode.com/problems/number-of-divisible-triplet-sums)

### Description  
Given a 0-indexed integer array `nums` and an integer `d`, return the number of triplets `(i, j, k)` such that:

- `0 ≤ i < j < k < n` (distinct, increasing indices)
- The sum (`nums[i] + nums[j] + nums[k]`) is divisible by `d` (that is, `(nums[i] + nums[j] + nums[k]) % d == 0`).

In other words: Count all unique triplets with strictly increasing indices whose elements sum to a multiple of `d`.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 4, 5], d = 3`  
Output: `4`  
*Explanation: The valid triplets are (0,1,2) → 1+2+3=6, (0,3,4) → 1+4+5=10, (1,2,3) → 2+3+4=9, and (2,3,4) → 3+4+5=12. All these sums are divisible by 3.*

**Example 2:**  
Input: `nums = [2, 3, 6, 1, 8, 4], d = 5`  
Output: `2`  
*Explanation: The valid triplets are (0,1,4) → 2+3+8=13, (1,2,5) → 3+6+4=13. Both 13 % 5 == 3, but check possible remainders; Only triplets (0,2,5) → 2+6+4=12 (not divisible), (1,3,4) → 3+1+8=12 (not divisible); Only (0,2,4) → 2+6+8=16 (divisible by 5? No). Only 2 valid triplets.*

**Example 3:**  
Input: `nums = [0, 0, 0], d = 1`  
Output: `1`  
*Explanation: Only one triplet (0,1,2) → 0+0+0=0, which is divisible by 1.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach is to check all triplets (i, j, k) with 0 ≤ i < j < k < n and count those whose sum is divisible by d.  
However, this is O(n³) and too slow for large n.

To optimize, let's recognize that for each pair (i, j) before index k, if we precalculate possible pair sums modulo d, we can check if adding nums[k] gives a multiple of d:

- As we scan the array, for every k, we can record how many pairs (i, j) with i < j < k have pair sums % d == t.
- For each k, we only need to know how many previous pairs sum to `(-nums[k] % d)`.  
- So, we keep a counter: for each modulo m (0 ≤ m < d), how many pairs before k have that sum mod d.

To maintain this efficiently, for each index, keep:
- freq[r]: how many times nums[i] % d == r before current index.
- pairs[s]: how many previous pairs sum % d == s.

As we go through nums:
- For each previous residue r (nums[j] % d), for current k:
    - pair_sum_mod = (nums[k] + r) % d.
    - For each freq[r], update pairs[(r + nums[k]) % d].
- For each k, add pairs[(-nums[k] % d) % d] to the answer.

This method brings the complexity to O(n d): for each element, updating O(d) buckets.

### Corner cases to consider  
- Less than three elements (output = 0).
- All numbers are the same.
- d = 1 (every triplet sum is divisible).
- Negative numbers in nums.
- nums contains zero or negative d (problem constraints may clarify).
- Large numbers or large d.

### Solution

```python
def countDivisibleTriplets(nums, d):
    n = len(nums)
    if n < 3:
        return 0

    freq = [0] * d  # freq[r] counts occurrences of nums[x] % d == r for x < k
    pairs = [0] * d # pairs[s] counts how many pairs (i,j) with sum % d == s for i<j<k

    total_triplets = 0

    for num in nums:
        num_mod = num % d

        # Number of pairs before current num such that their sum + num is divisible by d
        target = (-num_mod) % d
        total_triplets += pairs[target]

        # Update pairs: add all previous nums as new pairs with the current num
        for r in range(d):
            sum_mod = (r + num_mod) % d
            pairs[sum_mod] += freq[r]

        # Update frequency for this num_mod
        freq[num_mod] += 1

    return total_triplets
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × d)
  - For each element, we perform O(d) updates on the pairs array.
- **Space Complexity:** O(d)
  - Only O(d) extra storage for the freq and pairs arrays. No extra space scalability with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if d is very large?  
  *Hint: Is it possible to reduce space? When does the method become infeasible?*

- How would you adapt if you wanted all quadruples or higher tuples, not just triplets?  
  *Hint: Is there a dynamic programming approach or pattern?*

- Can this method be generalized if the array is being updated in place (online scenario)?  
  *Hint: Consider prefix sums and their remainders.*

### Summary
We used a combinatorial counting approach by tracking modulo residue counts and sum-pairs, allowing us to efficiently count valid triplets in O(n × d) time and O(d) space.  
This is a classic application of **prefix mod + bucket counting**, a pattern commonly used for subarray or tuple sum divisibility/counting problems.  
The pair/triplet residue summing trick works for similar questions involving summing tuples with modular constraints.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
