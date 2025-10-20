### Leetcode 2740 (Medium): Find the Value of the Partition [Practice](https://leetcode.com/problems/find-the-value-of-the-partition)

### Description  
Given an array of positive integers `nums`, split `nums` into two non-empty subarrays `nums₁` and `nums₂` such that every element of `nums` belongs to either `nums₁` or `nums₂`. Define the value of the partition as |max(nums₁) - min(nums₂)|, where max(nums₁) is the maximum of `nums₁` and min(nums₂) is the minimum of `nums₂`.  
Your goal: Return the smallest possible value of this partition.

---

### Examples  

**Example 1:**  
Input: `nums = [1,3,2,4]`  
Output: `1`  
*Explanation: Sort nums to [1,2,3,4]. Partition after 2: nums₁ = [1,2], nums₂ = [3,4]. The value is |2-3|=1, which is minimal.*

**Example 2:**  
Input: `nums = [100,1,10]`  
Output: `9`  
*Explanation: Sort nums to [1,10,100]. Partition after 1: nums₁ = [1], nums₂ = [10,100], value is |1-10|=9. Partition after 10: nums₁=[1,10], nums₂=, value is |10-100|=90. So, answer=9.*

**Example 3:**  
Input: `nums = [1,2]`  
Output: `1`  
*Explanation: Partition into nums₁=[1], nums₂=[2]. Value is |1-2|=1.*

---

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to try every split:  
  For all possible pairs of non-empty subarrays (i.e., for every 1 ≤ k < n), assign nums₁ = nums[:k] and nums₂ = nums[k:], then take max(nums₁), min(nums₂) and compute the absolute difference. This takes O(n²) time due to repeated max/min calculations.

- To optimize, notice that sorting the array gathers similar values together.  
  In a sorted array, if we partition between i and i+1, max(nums₁) is nums[i] and min(nums₂) is nums[i+1]. The minimum possible partition value is then the minimal difference between adjacent elements.

- Thus, sort nums, and the answer is min(nums[i+1] - nums[i]) for 0 ≤ i < n-1.  
  This works because, for positive integers, min/max at the boundary gives the closest possible pair between subarrays.

- Sorting is O(n log n), and then a single O(n) pass to find minimal adjacent difference.  
  This is much faster than O(n²).

---

### Corner cases to consider  
- Very small arrays (`nums` of length 2)  
- Arrays where all elements are equal  
- Arrays with large gaps (e.g., [1, 100])  
- Arrays with consecutive numbers (e.g., [3,4,5,6])  
- Unsorted input array  
- Duplicates (e.g., [1,2,2,3])

---

### Solution

```python
def findValueOfPartition(nums):
    # Sort the array to ensure adjacent elements are as close as possible
    nums.sort()
    
    # Initialize answer with a large number
    min_diff = float('inf')
    
    # Iterate through adjacent pairs to find the minimum difference
    for i in range(1, len(nums)):
        # The value of partition between nums[:i] and nums[i:]
        diff = nums[i] - nums[i-1]
        if diff < min_diff:
            min_diff = diff
    
    return min_diff
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the length of `nums`. Sorting dominates the time; finding min difference is O(n).
- **Space Complexity:** O(1) extra space (sorting in place), or O(n) if language sorting creates a copy; no extra data structures used.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array can contain negative numbers?
  *Hint: How does partition value definition change if negatives exist?*  

- Can you solve it in a single pass without sorting if the input is already sorted?  
  *Hint: How much information do you need to keep?*

- How would you adapt the solution if you want the maximum possible partition value?  
  *Hint: Where would you split to get largest max(nums₁)-min(nums₂)?*

---

### Summary
This problem is a classic application of the **Sorting** pattern, and specifically leverages the intuition that adjacent elements in a sorted list have the minimum absolute difference. The approach is optimal for partition-type questions where the goal is to minimize/maximize the result based on boundaries. Similar patterns appear in problems like minimizing the maximum gap, or optimal pairings from sorted lists.


### Flashcard
Sort array, then the minimal partition value is the smallest difference between adjacent elements after sorting.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
