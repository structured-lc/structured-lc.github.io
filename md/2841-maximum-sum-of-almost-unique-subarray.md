### Leetcode 2841 (Medium): Maximum Sum of Almost Unique Subarray [Practice](https://leetcode.com/problems/maximum-sum-of-almost-unique-subarray)

### Description  
Given an integer array nums, and integers m and k, you need to find the maximum sum among all subarrays of length k such that the subarray contains at least m pairwise distinct elements.  
A subarray is defined as **almost unique** if it has at least m distinct elements. Return the largest sum of such a subarray; if none exist, return 0.

### Examples  

**Example 1:**  
Input: `nums = [2,6,7,3,1,7], m = 3, k = 4`  
Output: `18`  
Explanation: The subarrays of size 4 are:  
- [2,6,7,3] sum=18, distinct=4  
- [6,7,3,1] sum=17, distinct=4  
- [7,3,1,7] sum=18, distinct=3  
All three are almost unique (at least 3 distinct), and [2,6,7,3] or [7,3,1,7] gives the maximum sum 18.

**Example 2:**  
Input: `nums = [5,9,9,2,4,5,4], m = 1, k = 3`  
Output: `23`  
Explanation: The subarrays of size 3 are:  
- [5,9,9] sum=23, distinct=2  
- [9,9,2] sum=20, distinct=2  
- [9,2,4] sum=15, distinct=3  
- [2,4,5] sum=11, distinct=3  
- [4,5,4] sum=13, distinct=2  
All have at least 1 distinct, and [5,9,9] has the maximum sum of 23.

**Example 3:**  
Input: `nums = [1,2,1,2,1,2,1], m = 3, k = 3`  
Output: `0`  
Explanation: All subarrays of size 3 are either [1,2,1], [2,1,2], [1,2,1], [2,1,2], [1,2,1].  
Each has at most 2 distinct elements (<3), so none qualify. The answer is 0.

### Thought Process (as if you’re the interviewee)  
1. **Brute-force approach**:  
   - Generate all subarrays of length k.
   - For each subarray, count its distinct elements and sum.
   - If distinct count ≥ m, update answer with the sum.
   - Too slow: O(n × k) time, as counting distincts in each window costs O(k), and there are O(n) windows.

2. **Optimize with sliding window and frequency map**:  
   - Use a sliding window of size k.
   - Maintain a hash map to count element frequencies in the current window.
   - As you slide the window, add the new element and remove the leftmost one, updating the count map and sum.
   - Maintain a variable to track the number of distinct elements.
   - At each step, only check the current window: if distinct count ≥ m, update max sum.
   - This is efficient: each step only does O(1) work for adding/removing, so total O(n).

3. **Final Approach**:  
   - Sliding window with a counter, tracking the sum and the number of distinct elements.

### Corner cases to consider  
- Empty array nums (n=0): (but constraints guarantee at least 1 element)
- m > k (impossible to satisfy, but constraints guarantee 1 ≤ m ≤ k)
- All elements in nums are the same (cannot get more than one distinct)
- m equals k (window must be all distinct)
- Window at the end of the array
- No valid window exists (return 0)

### Solution

```python
def maxSum(nums, m, k):
    # Frequency map to count elements in the current window
    freq = {}
    window_sum = 0
    max_sum = 0
    distinct_count = 0
    n = len(nums)

    # Initialize window
    for i in range(n):
        num = nums[i]
        # Add new number to frequency map
        if num not in freq or freq[num] == 0:
            distinct_count += 1
            freq[num] = 1
        else:
            freq[num] += 1

        window_sum += num

        # Shrink window if it's size > k
        if i >= k:
            rem = nums[i - k]
            freq[rem] -= 1
            if freq[rem] == 0:
                distinct_count -= 1
            window_sum -= rem

        # If window size == k and at least m distinct, consider for max_sum
        if i >= k - 1 and distinct_count >= m:
            max_sum = max(max_sum, window_sum)

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is added and removed from the window at most once, and hash map operations (insert, delete) are O(1) on average.

- **Space Complexity:** O(k)  
  The frequency map holds at most k elements at any time (size of the window).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is huge and doesn't fit into memory?  
  *Hint: What streaming solutions are possible? Can you process the array in chunks?*

- Can you solve it if you have to return the starting index of the maximum-sum window as well?  
  *Hint: Track the starting index whenever you update max_sum.*

- How would you handle the case where m and k can change per query, and you need to support multiple queries efficiently?  
  *Hint: Could a data structure or preprocessing help?*

### Summary
This problem demonstrates the **sliding window with hash map (frequency counter) pattern**, a very common technique for problems requiring tracking properties (e.g., distinct elements, sums) over fixed-size subarrays. This pattern generalizes well to similar questions such as "Longest subarray with at most k distinct values", "Maximum average subarray", and "Subarrays with at most k odd numbers".

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window)

### Similar Problems
