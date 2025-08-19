### Leetcode 2170 (Medium): Minimum Operations to Make the Array Alternating [Practice](https://leetcode.com/problems/minimum-operations-to-make-the-array-alternating)

### Description  
You are given a 0-indexed integer array nums. An array is called **alternating** if:
- For every i ≥ 2, nums[i] == nums[i-2], and
- For every i ≥ 1, nums[i] ≠ nums[i-1].

In one operation, you can change any nums[i] to any positive integer you want.  
Return the **minimum number of operations** needed to make nums alternating.

### Examples  

**Example 1:**  
Input: `nums = [3,1,3,2,4,3]`,  
Output: `3`  
*Explanation: A valid transformation is [3,1,3,1,3,1]. Change elements at positions 3 (2→1), 4 (4→3), 5 (3→1). 3 changes total. Cannot do better.*

**Example 2:**  
Input: `nums = [1,2,2,2,2]`,  
Output: `2`  
*Explanation: A possible output is [1,2,1,2,1]. Change nums[2] (2→1) and nums[4] (2→1). Total: 2 changes.*

**Example 3:**  
Input: `nums = [1,1,1,1,1]`,  
Output: `2`  
*Explanation: Make it [1,2,1,2,1] by changing nums[1]=1→2, nums[3]=1→2. 2 operations.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each index, pick arbitrary numbers for even/odd positions and count minimal changes by trying all combinations. But this is O(n²) or worse.

- **Optimized:**  
  Since alternating means "even indices" and "odd indices" must follow their own repeating pattern, collect the most frequent number in even indices, and the most frequent in odd indices.
  - If the most common numbers from even and odd are not the same, use them as your two alternating numbers.
      - Ops = n - (count_even_max + count_odd_max)
  - If they're the same:
      - Choose the second most common number for either even or odd slots.
      - Try both options, take the minimum ops:
        - Use (even most-common, odd second-most common)
        - Use (even second-most common, odd most-common)

This works because changing less frequent numbers on each "track" minimizes operations. The case where both tracks' most common numbers are the same must be avoided for valid alternation.

### Corner cases to consider  
- Array of length 1 — already alternating, return 0.
- Array with all elements equal (e.g., [1,1,1,1]) — must interleave a second value.
- Array with only one repeated value at even or odd positions.
- Large arrays for efficiency.
- Input where even and odd most common are the same number.
- Arrays where there is no overlap between values at even and odd indices.

### Solution

```python
def minimumOperations(nums):
    # Step 1: Count frequency for even and odd indices separately
    even_count = {}
    odd_count = {}
    n = len(nums)
    for i, num in enumerate(nums):
        if i % 2 == 0:
            even_count[num] = even_count.get(num, 0) + 1
        else:
            odd_count[num] = odd_count.get(num, 0) + 1

    # Step 2: Get top two most common for even and odd indices
    def top_two(counter):
        # Returns [(num1, count1), (num2, count2)]
        # Fill with (None, 0) if less than two elements.
        items = sorted(counter.items(), key=lambda x: -x[1])
        return items + [(None, 0)] * (2 - len(items))

    even_top = top_two(even_count)
    odd_top = top_two(odd_count)

    # Step 3: Calculate minimal changes required
    n_even = (n + 1) // 2
    n_odd = n // 2
    if even_top[0][0] != odd_top[0][0]:
        # Most common values are different
        return n - (even_top[0][1] + odd_top[0][1])
    else:
        # Must pick second best for either even or odd
        # Option 1: even's best, odd's second best
        ops1 = n - (even_top[0][1] + odd_top[1][1])
        # Option 2: even's second best, odd's best
        ops2 = n - (even_top[1][1] + odd_top[0][1])
        return min(ops1, ops2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) —  
  Building frequency counts is O(n).
  Extracting top two elements from a dict with at most 10⁵ keys is O(1) since max 10⁵ (constant time sorting for up to two items).
- **Space Complexity:** O(m)  
  Where m is the number of unique numbers in nums (at most 10⁵), for the two dictionaries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums had range up to 10¹⁸?  
  *Hint: Can you use counting logic without materializing all possible numbers?*

- How would this change if you could only increment (not assign arbitrary values)?  
  *Hint: Now minimizing difference rather than arbitrary assignment.*

- How would you output one solution (not just the count of changes)?  
  *Hint: Once you pick the two target values, traverse and construct the sequence.*

### Summary
This problem uses **frequency counting** and **greedy optimization** — a common pattern for finding minimum changes for sequences that require an alternation or repetition. The key trick is handling the conflict when the most common number for even and odd indices is the same by considering the second-most frequent for one of the positions. This pattern of "split-by-position analysis" is useful in similar problems requiring periodic sequence alternation or transformation.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Counting(#counting)

### Similar Problems
- Minimum Deletions to Make Array Beautiful(minimum-deletions-to-make-array-beautiful) (Medium)
- Minimum Number of Flips to Make the Binary String Alternating(minimum-number-of-flips-to-make-the-binary-string-alternating) (Medium)