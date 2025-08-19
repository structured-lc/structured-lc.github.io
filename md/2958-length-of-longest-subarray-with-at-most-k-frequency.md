### Leetcode 2958 (Medium): Length of Longest Subarray With at Most K Frequency [Practice](https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency)

### Description  
Given an integer array `nums` and an integer `k`, find the length of the longest contiguous subarray (i.e., subarray) where the maximum frequency of any element is **at most** `k`. In other words, you want the largest window where no single element appears more than `k` times.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,1,2,3,1,2]`, `k = 2`  
Output: `6`  
*Explanation: The subarray `[2,3,1,2,3,1]` is valid since no number appears more than 2 times. Any longer subarray would have a number repeated 3 times.*

**Example 2:**  
Input: `nums = [4,4,4,4]`, `k = 1`  
Output: `1`  
*Explanation: Any subarray of length > 1 will have the number 4 repeated more than once, which exceeds `k`.*

**Example 3:**  
Input: `nums = [1,2,3,4,5]`, `k = 1`  
Output: `5`  
*Explanation: Each element is unique, so the whole array is valid.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible subarrays and check for each if any element appears more than `k` times. This requires O(n²) subarrays and O(n) to count element frequencies, leading to O(n³) overall—much too slow.

- **Optimize with Sliding Window:**  
  The main bottleneck is rechecking frequencies. If we use a hash map to track frequencies as we expand a window, we can maintain counts “on-the-fly.”
  - Use two pointers `left` and `right` to represent the window.
  - As `right` expands, increment the count of `nums[right]`.
  - If any count exceeds `k`, move `left` forward and decrement the count of `nums[left]` until all counts are ≤ `k`.
  - Keep track of the maximum window length found.

- **Why Sliding Window is optimal:**  
  Each element is added/removed at most once from the window, so overall O(n) time. This approach is possible because all window expansions/contractions are linear.

### Corner cases to consider  
- Empty array (`nums = []`): Should return 0, as there are no subarrays.
- `k = 0`: Means no element can appear even once, so answer is always 0.
- All elements the same: Only subarrays up to length `k` are valid.
- All elements unique: Whole array is always valid if `k ≥ 1`.
- Array length = 1: Should always return 1 if `k ≥ 1`.

### Solution

```python
def maxSubarrayLength(nums, k):
    # Dictionary to store frequency of elements in the window
    freq = {}
    left = 0
    max_len = 0

    for right in range(len(nums)):
        # Increment frequency of current element
        num = nums[right]
        freq[num] = freq.get(num, 0) + 1

        # If frequency exceeds k, shrink window from the left
        while freq[num] > k:
            freq[nums[left]] -= 1
            left += 1

        # Update the maximum window length
        max_len = max(max_len, right - left + 1)

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is inserted and removed from the window at most once, so both pointers move across the array only once.

- **Space Complexity:** O(u)  
  Where `u` is the number of unique elements in `nums`, because that's the maximum size of the frequency map at any time.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is very large and doesn’t fit into memory?
  *Hint: Consider streaming/window algorithms.*

- What if you want to find the actual subarray, not just the length?
  *Hint: Store additional information about indices.*

- How would the solution change if k can be different for each unique element?
  *Hint: k would become a dictionary or function for elements; sliding window still works but logic inside should update per-element.*

### Summary
This problem is a classic **variable-sized sliding window** pattern, leveraging a hash map to dynamically track frequencies as the window expands and contracts. The same technique is frequently used in substring/subarray problems involving frequency constraints (e.g., longest substring with at most k distinct letters, longest subarray with sum ≤ k).

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window)

### Similar Problems
- Longest Substring with At Least K Repeating Characters(longest-substring-with-at-least-k-repeating-characters) (Medium)