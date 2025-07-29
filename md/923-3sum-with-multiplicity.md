### Leetcode 923 (Medium): 3Sum With Multiplicity [Practice](https://leetcode.com/problems/3sum-with-multiplicity)

### Description  
Given an array of integers `arr` and an integer `target`, count how many different triplets `(i, j, k)` exist such that `0 ≤ i < j < k < arr.length`, and `arr[i] + arr[j] + arr[k] == target`. Since the answer can be very large, return it modulo 1,000,000,007.  
In this problem, the **order of selection matters** only in terms of indices but not in values. If a value appears multiple times in the array, it contributes to multiple valid triplets, and repeated values should be counted according to their frequency.

### Examples  

**Example 1:**  
Input: `arr = [1,1,2,2,3,3,4,4,5,5], target = 8`  
Output: `20`  
*Explanation: (1,2,5) occurs 8 times; (1,3,4) occurs 8 times; (2,2,4) occurs 2 times; (2,3,3) occurs 2 times. Total = 20 ways.*

**Example 2:**  
Input: `arr = [1,1,2,2,2,2], target = 5`  
Output: `12`  
*Explanation: One 1 from [1,1] (2 ways), two 2s from [2,2,2,2] (6 ways). 2 × 6 = 12 triplets.*

**Example 3:**  
Input: `arr = [2,2,2], target = 6`  
Output: `1`  
*Explanation: Only one way: all elements are 2.*

### Thought Process (as if you’re the interviewee)  
- The brute-force method checks every triplet (i, j, k) where 0 ≤ i < j < k < n. However, with up to 3,000 elements, this results in O(n³) operations, which is far too slow.
- To optimize, note that all values are in the range 0…100. First, count the frequency of each value in `arr`.
- Then, find all combinations of three numbers (x, y, z) such that x + y + z = target and 0 ≤ x ≤ y ≤ z ≤ 100.
- For each such (x, y, z), count how many triplets can be formed:
  - If all values are different, the count is freq[x] × freq[y] × freq[z].
  - If two values are the same, use combinations: C(freq, 2) = freq × (freq-1)/2, and multiply appropriately.
  - If all are the same, use C(freq, 3) = freq × (freq-1) × (freq-2)/6.
- This approach is efficient (at most 101³/6 ≈ 171,700 combinations to check, much less in practice since most triples sum to the wrong value).
- We choose this frequency-counting approach because it avoids duplicating work and leverages the limited value range.

### Corner cases to consider  
- arr has fewer than 3 elements (should return 0).
- All numbers are the same.
- All numbers are distinct.
- arr includes values outside of the possible target sum.
- Duplicate values, large frequency for one number.
- No triplet sums to the target.
- arr includes zeros.

### Solution

```python
def threeSumMulti(arr, target):
    MOD = 10 ** 9 + 7

    # Frequency array for 0..100
    freq = [0] * 101
    for num in arr:
        freq[num] += 1

    result = 0

    # Iterate x ≤ y ≤ z
    for x in range(101):
        if freq[x] == 0:
            continue
        for y in range(x, 101):
            if freq[y] == 0:
                continue
            z = target - x - y
            if z < y or z > 100 or freq[z] == 0:
                continue

            # Three cases for (x, y, z)
            if x == y == z:
                # freq[x] choose 3
                count = freq[x] * (freq[x] - 1) * (freq[x] - 2) // 6
            elif x == y != z:
                # freq[x] choose 2, times freq[z]
                count = freq[x] * (freq[x] - 1) // 2 * freq[z]
            elif x < y == z:
                # freq[y] choose 2, times freq[x]
                count = freq[y] * (freq[y] - 1) // 2 * freq[x]
            else: # x < y < z
                count = freq[x] * freq[y] * freq[z]
            result = (result + count) % MOD

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(101²) = O(1), since value range is bounded and checking (x, y) pairs is at most 101²; each triplet calculation is constant time.
- **Space Complexity:** O(1) extra, as only one frequency array of size 101 is used, regardless of input size; the space for the output is negligible.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the value range was not small and could be arbitrarily large?  
  *Hint: Hash maps instead of fixed arrays for frequency counting; be careful with performance for combinatorics.*

- What if we want to also return the actual triplet combinations, not just the counts?  
  *Hint: Consider performance/memory tradeoffs for storing all triplets; may not be feasible for large input.*

- Can you solve this problem if repeated indices are allowed (i.e., i, j, k not all distinct)?  
  *Hint: Carefully rethink counting logic; standard combinations may not directly apply.*

### Summary
This problem uses the **combinatorics with frequency counting** pattern, exploiting limited value range for efficient O(1) time (per value range). The classic 3-sum is modified to account for element frequencies and index ordering, demonstrating the benefit of "reduce to counting" approaches. This pattern generalizes to k-sum with small integer ranges and can appear in problems involving triplets, subsets, or any group counting with duplicates.