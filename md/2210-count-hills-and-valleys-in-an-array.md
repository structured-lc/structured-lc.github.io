### Leetcode 2210 (Easy): Count Hills and Valleys in an Array [Practice](https://leetcode.com/problems/count-hills-and-valleys-in-an-array)

### Description  
You are given a 0-indexed integer array. Your task is to count how many "hills" and "valleys" are present.  
- A **hill** is an element that is **greater than** its nearest distinct neighbors on both sides.
- A **valley** is an element that is **less than** its nearest distinct neighbors on both sides.
- If adjacent elements are equal, treat them as part of the same group (ignore all but one when comparing).
- The first and last elements can never be hills or valleys.

### Examples  

**Example 1:**  
Input: `nums = [2,4,1,1,6,5]`  
Output: `3`  
*Explanation: The hills and valleys are at indices 1 (hill, 4), 2 (valley, 1), and 4 (hill, 6).*

**Example 2:**  
Input: `nums = [6,6,5,5,4,1]`  
Output: `0`  
*Explanation: After removing adjacent duplicates: [6,5,4,1]. There are no hills or valleys.*

**Example 3:**  
Input: `nums = [1,2,2,2,1,1,2,5,2]`  
Output: `2`  
*Explanation: After removing adjacent duplicates: [1,2,1,2,5,2]. The valleys and hills are at indices 1 (hill, 2) and 2 (valley, 1).*

### Thought Process (as if you’re the interviewee)  
First, I’d try a brute-force approach by checking for every element (except the first and last) if it’s a hill or valley by comparing it to its immediate left and right. 

But, with the rule: “closest distinct neighbors,” if there are consecutive duplicates, we need to ignore all dups except one. So, the first step is to preprocess the array to remove adjacent duplicates, leaving only their first occurrence (or just not repeating).

After that, for each index i from 1 to n-2:
- If arr[i] > arr[i-1] and arr[i] > arr[i+1], it’s a hill.
- If arr[i] < arr[i-1] and arr[i] < arr[i+1], it’s a valley.

This approach is linear and straightforward, since removing duplicates and then scanning both take O(n).

### Corner cases to consider  
- Empty array, or only one element.
- All elements equal (no hills/valleys).
- Input with consecutive equal elements (e.g. [2,2,2,2]).
- Multiple hills/valleys at the edges (shouldn’t count).
- No hills/valleys at all.
- Input already with no adjacent duplicates.

### Solution

```python
def countHillValley(nums):
    # Step 1: Remove consecutive duplicates
    arr = [nums[0]]
    for num in nums[1:]:
        if num != arr[-1]:
            arr.append(num)
    
    count = 0
    # Step 2: Iterate and check for hills and valleys
    for i in range(1, len(arr)-1):
        if arr[i] > arr[i-1] and arr[i] > arr[i+1]:
            count += 1  # hill
        elif arr[i] < arr[i-1] and arr[i] < arr[i+1]:
            count += 1  # valley
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Removing consecutive duplicates and scanning for hills/valleys both iterate through the array once.
- **Space Complexity:** O(n) extra for storing the preprocessed array. Input array remains unchanged.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the indices of hills and valleys instead of the count?  
  *Hint: Instead of a count, create a list and append i if it's a hill or valley.*

- Can you solve it in-place with O(1) space if extra array space is not allowed?  
  *Hint: Carefully skip dups during comparison, using pointer variables, without building a new array.*

- How would you modify the solution if hills and valleys were defined by elements being strictly greater/less than all elements in a sliding window of k neighbors?  
  *Hint: Use a sliding window technique and compare against all k-neighbor values on both sides.*

### Summary
The key insight is to preprocess the array to remove consecutive duplicates before searching for hills or valleys, dramatically simplifying comparisons. This uses the **"scan-and-filter"** pattern, which is widely applicable in problems involving local peaks, valleys, or monotonicity after flattening out duplicate runs. Patterns involving nearest distinct neighbors and sequence cleaning often use a similar filtering step.


### Flashcard
Remove adjacent duplicates, then for each element (except ends), check if it’s a hill (greater than neighbors) or valley (less than neighbors).

### Tags
Array(#array)

### Similar Problems
- Find Peak Element(find-peak-element) (Medium)
- Monotonic Array(monotonic-array) (Easy)
- Minimum Subsequence in Non-Increasing Order(minimum-subsequence-in-non-increasing-order) (Easy)