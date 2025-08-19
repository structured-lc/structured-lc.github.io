### Leetcode 2860 (Medium): Happy Students [Practice](https://leetcode.com/problems/happy-students)

### Description  
Given an array `nums`, where `nums[i]` is the *happiness threshold* for the iᵗʰ student, find how many ways you can select a group of students so that **every student is happy**.  
A student is **happy** if one of these holds:  
- The student is **selected**, and the total number of selected students is **strictly greater than** `nums[i]`.
- The student is **not selected**, and the number of selected students is **strictly less than** `nums[i]`.  
Return the number of ways to select groups such that all students are happy. *You can select any (possibly zero) subset as the group.*

### Examples  

**Example 1:**  
Input: `nums = [1,1]`  
Output: `2`  
*Explanation: You can select 0 students (all are not selected, 0 < 1 for both), or select both students (2 > 1 for both).*

**Example 2:**  
Input: `nums = [6,0,3,3,6,7,2,7]`  
Output: `3`  
*Explanation:*
- Select no students: 0 selected, for all i, 0 < nums[i] (but since there's a 0, that student would not be happy), so this way is NOT valid.
- Select all 8 students: 8 > nums[i] for all i, so all are happy (valid).
- Select 4 students: if you select exactly 4, check the split point (see logic in algorithm).
- Select 5 students: similar logic.
- Select 7 students: see below.
- It turns out the valid ways correspond to 3 possible sizes of groups.

**Example 3:**  
Input: `nums = [2,4,2,0,1]`  
Output: `3`  
*Explanation: Valid group sizes are 2, 3, and 5.*

### Thought Process (as if you’re the interviewee)  

Start by considering the meaning of the happy condition.  
- For a student to be happy when **selected**, we need group size > nums[i].
- For a student to be happy when **not selected**, we need group size < nums[i].

This means:  
- For any chosen group, the number of selected students (let's call this `k`) must be:
  - For all selected students: `k > nums[i]`
  - For all unselected students: `k < nums[i]`
- If you sort nums, for each k (number of selected students from 0 to n), you need to check:
    - The k smallest students (if selected): k > nums[i]
    - The n-k largest students (if unselected): k < nums[j]

Brute-force:
- Try every possible k (group size), check if it satisfies the happiness conditions.
- For each k, select k students and check if all conditions hold (O(n²)).

Optimization:
- If nums is sorted, for each possible k (from 0 to n), let's check the split:
    - For all students at positions < k: if k > nums[i] (i.e., select these students)
    - For all i ≥ k: if k < nums[i] (i.e., not select these students)
- To count the valid k, sort nums and for k=0..n, check if k > nums[k-1] (if k > 0), and k < nums[k] (if k < n).

Final approach:
- Sort the array.
- For k from 0 to n, check:  
    (k == 0 or k > nums[k-1]) and (k == n or k < nums[k]).
- Count how many k satisfy this.
- Special care: If nums contains 0, it's not allowed to select zero students, since the 0ᵗʰ student will not be happy unless selected.

### Corner cases to consider  
- Empty array input (no students).
- All numbers in nums are equal (e.g., [2,2,2]).
- nums contains 0.
- nums contains repeated values.
- nums is already sorted or reverse sorted.
- Only one element in nums.

### Solution

```python
def countWays(nums):
    # Sort nums to make split point logic work
    nums.sort()
    n = len(nums)
    ans = 0

    # Try all possible group sizes k from 0 to n
    for k in range(n + 1):
        # Check if all selected students are happy (those at index < k): k > nums[i]
        sel_happy = (k == 0 or k > nums[k-1])
        # Check if all unselected students are happy (those at index ≥ k): k < nums[k]
        unsel_happy = (k == n or k < nums[k])
        if sel_happy and unsel_happy:
            ans += 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting nums, as the only sorting dominates.
- **Space Complexity:** O(1) extra space (since sorting can be done in place), O(n) if counting the input storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to return the actual groupings, not just the count?  
  *Hint: Can you reconstruct the indices for each valid k?*

- Can you solve this without sorting, or in O(n) time?  
  *Hint: Use buckets if nums values are bounded.*

- What if nums can have negative numbers?  
  *Hint: How does the happiness condition behave for negative thresholds?*

### Summary
This is a **greedy + sorting + split point** problem, closely related to counting valid partitions in arrays based on sorted values and strict inequalities.  
The core trick is to use a sorted array so you can check, for each possible group size, if all selected students and all unselected students are happy via their threshold relative to the group size.  
This pattern of enumerating partitions based on "left vs right" satisfaction under sorted order is common and can be reused in problems like minimizing the unfairness, energy problems, or partitioning arrays by satisfaction constraints.

### Tags
Array(#array), Sorting(#sorting), Enumeration(#enumeration)

### Similar Problems
