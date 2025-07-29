### Leetcode 2875 (Medium): Minimum Size Subarray in Infinite Array [Practice](https://leetcode.com/problems/minimum-size-subarray-in-infinite-array)

### Description  
Given a zero-indexed array **nums** and an integer **target**, imagine an infinite array **infinite_nums** formed by repeating **nums** infinitely. Determine the length of the shortest contiguous subarray (possibly running across copies of **nums**) within **infinite_nums** that sums to exactly **target**. Return -1 if no such subarray exists.  
This means if nums = [1,2,3], infinite_nums is [1,2,3,1,2,3,1,2,3,...], and you want to find the minimal window of this infinite sequence whose sum is target.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`, `target = 5`  
Output: `2`  
Explanation: The shortest subarray is `[2,3]` which sums to 5.

**Example 2:**  
Input: `nums = [2,4,6,8]`, `target = 14`  
Output: `2`  
Explanation: The subarray `[6,8]` sums to 14.

**Example 3:**  
Input: `nums = [2,4,6,8]`, `target = 8`  
Output: `1`  
Explanation: The subarray `` is already valid with length 1.

**Example 4:**  
Input: `nums = [1,1,1]`, `target = 5`  
Output: `5`  
Explanation: Sum of `[1,1,1,1,1]` (using first 2 of the second repeat), which is a length-5 subarray in the infinite array.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try every subarray by simulating a long enough finite version of infinite_nums (e.g. concatenate nums to itself many times). Try every possible window, checking if it sums to target. This works but is too slow and impractical for large targets.

- **Observation 1:**  
  Since the array repeats with period n = len(nums), if target is large, we may need to "wrap around" multiple times.  
  For any subarray, its sum is the sum of some entire repeats (`k` times sum(nums)) + a prefix + a suffix.

- **Prefix Sum + Hashmap:**  
  Compute prefix sums for nums, and use a hashmap to store prefix sums (to efficiently find any range sum == target). We can simulate up to 2×len(nums) to cover all wrap-around subarrays.

- **Optimization:**  
  If target ≥ sum(nums), try subtracting as many full nums as possible:  
    - Let s = sum(nums)  
    - Let k = target // s, rem = target % s  
    - If rem == 0, the answer is k × n (since concatenating full arrays reaches the sum exactly).  
    - For rem > 0, find the shortest subarray in two copies of nums whose sum is rem, and overall length = k × n + that subarray's length.  
    - If no such subarray of sum rem, return -1.

- **Why two copies?**  
  To handle subarrays that wrap from the end of one to the start of the next.

### Corner cases to consider  
- Empty nums array (return -1, not valid input though).
- target smaller than any nums[i]: check single element subarrays.
- All elements the same.
- target cannot be formed.
- target is 0 (should handle zeros in the array).
- Negative numbers in nums.
- Very large target (must be efficient — avoid simulating an infinitely long array).

### Solution

```python
def minSizeSubarray(nums, target):
    n = len(nums)
    total = sum(nums)
    ans = float('inf')
    
    # Handling multiples of complete rounds of nums
    k = target // total
    rem = target % total

    # If remainder is 0, answer is k × n
    if rem == 0:
        return k * n

    # Now find smallest subarray in upto 2×nums whose sum is rem
    arr = nums * 2
    prefix_sum = 0
    prefix_map = {0: -1}  # prefix_sum: index

    for idx, el in enumerate(arr):
        prefix_sum += el
        if prefix_sum - rem in prefix_map:
            prev_idx = prefix_map[prefix_sum - rem]
            length = idx - prev_idx
            if length <= n * 2:
                ans = min(ans, length)
        # Only keep first occurrence for minimal length
        if prefix_sum not in prefix_map:
            prefix_map[prefix_sum] = idx

    return k * n + ans if ans != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums).  
  The algorithm only traverses up to 2n elements for the search, and all operations in the loop are O(1).
- **Space Complexity:** O(n), for the prefix_map and up to 2n elements in the duplicated array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if the array could have negative values?  
  *Hint: Prefix sums would need special attention, as negative numbers could create new subarray sums.*

- What if we want the indices of the subarray, not just the length?  
  *Hint: Store more info in prefix_map, like starting indices.*

- Can you optimize space if n is extremely large?  
  *Hint: Is it necessary to duplicate the array, or can you simulate with modular arithmetic?*

### Summary  
This problem is solved using the **prefix sum + hashmap** approach, a common coding pattern for subarray sum problems (e.g., "Subarray sum equals k"). We optimized for the infinite nature by handling full cycles and only searching for the remainder in a doubled array. This is a classic pattern for problems involving cyclic or repeated structures and can be broadly applied in other overlapping subarray, circular array, or repeated-pattern search scenarios.