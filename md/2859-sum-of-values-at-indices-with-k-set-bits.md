### Leetcode 2859 (Easy): Sum of Values at Indices With K Set Bits [Practice](https://leetcode.com/problems/sum-of-values-at-indices-with-k-set-bits)

### Description  
You are given an array of integers `nums` and an integer `k`.  
Your task is to compute the sum of all values in `nums` whose indices, when represented in binary, have exactly **k set bits** (i.e., k ones). For each index, if the number of set bits is k, you'll include the value at that index in the total sum.  
For example, if `k = 2`, you sum all `nums[i]` where the index `i` has two ones in its binary representation.

### Examples  

**Example 1:**  
Input: `nums = [5,10,1,5,2]`, `k = 1`  
Output: `17`  
*Explanation: Indices with 1 set bit (in 0-based indices): 1 (001), 2 (010), and 4 (100).  
So, sum = nums[1] + nums[2] + nums[4] = 10 + 1 + 6 = 17.*

**Example 2:**  
Input: `nums = [4,3,2,1]`, `k = 2`  
Output: `1`  
*Explanation: Indices with 2 set bits: 3 (011).  
So, sum = nums[3] = 1.*

**Example 3:**  
Input: `nums = [5,7,7,3,5,8,4,5]`, `k = 0`  
Output: `5`  
*Explanation: Indices with 0 set bits: 0 (000).  
So, sum = nums = 5.*

### Thought Process (as if you’re the interviewee)  
Start with a straightforward brute-force approach:
- For each index in the array, count the number of set bits in its binary representation.
- If it equals `k`, add the value at that index to the sum.

Counting set bits is most naturally done by repeatedly shifting and masking, but modern Python (and many other languages) offers a `bit_count()` or equivalent, which makes this O(1) per index.

This brute-force approach iterates over every index exactly once, so it's O(n) overall, where n is the size of `nums`.

There’s not much optimization to do because checking set bits is fast (either a built-in function or a simple loop that runs at most log₂(n) times), and we must visit every index anyway.

This approach is easy to understand, code, and verify—trade-off is mainly in code simplicity vs. possible micro-optimization by bit hacks, which is unnecessary given the constraints.

### Corner cases to consider  
- Empty array (`nums = []`; the answer is 0)
- `k` greater than the number of bits possible (`k` > ⌊log₂ n⌋)
- `k = 0` (only index 0)
- All elements in nums are equal
- Only one element in nums
- Very large values in nums

### Solution

```python
def sum_indices_with_k_set_bits(nums, k):
    # Initialize the running sum
    total = 0

    # Loop through each element and its index
    for i, num in enumerate(nums):
        # Count the number of set bits in the current index
        count = 0
        n = i
        while n:
            count += n & 1
            n >>= 1
        # If the set bit count equals k, add the value at this index
        if count == k:
            total += num
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log n), where n is len(nums). For each index (0 to n-1), counting set bits may take up to O(log n) time (number of bits in index). With Python’s `bit_count()` or similar methods, it’s still O(n) in practice, since bit width is fixed for reasonable input sizes.
- **Space Complexity:** O(1) beyond the input; only a simple accumulator and loop counters are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of set bits is not k, but instead any number within a range [k₁, k₂]?
  *Hint: How would you adjust your conditional when summing?*

- How would you solve this for a stream of incoming nums, where you can’t store the entire array?
  *Hint: Can you keep only the running sum for indices seen so far?*

- Can you preprocess all set bit counts for indices up to len(nums) so you avoid recomputation?
  *Hint: Use a cache/list of bit counts per index; answer repeated or many queries.*

### Summary
This problem is a **bit manipulation + enumeration** pattern: for each index, count properties about its binary representation and selectively sum values. Such approaches are common in bitmask dynamic programming, subset sum enumeration, and questions where index properties govern computation. The key concept is mapping problem properties ("k set bits") to computational checks and using simple loops for an O(n) solution.