### Leetcode 1095 (Hard): Find in Mountain Array [Practice](https://leetcode.com/problems/find-in-mountain-array)

### Description  
You are given a **mountain array** (an array that increases to a single peak and then decreases). You don’t have direct access to the array; instead, you can use an interface with two operations: `get(index)` and `length()`.  
Your task: Given a target value, **return the smallest index where the target appears** in the mountain array. If it does not exist, return -1.

A mountain array has the property that:
- For some peak index `p`, `arr < arr[1] < ... < arr[p-1] < arr[p] > arr[p+1] > ... > arr[n-1]`.

### Examples  

**Example 1:**  
Input: `mountain_arr = [1,2,3,4,5,3,1]`, `target = 3`  
Output: `2`  
*Explanation: 3 appears at indices 2 and 5. The smallest index is 2.*

**Example 2:**  
Input: `mountain_arr = [0,1,2,4,2,1]`, `target = 3`  
Output: `-1`  
*Explanation: 3 does not appear in the array.*

**Example 3:**  
Input: `mountain_arr = [1,5,2]`, `target = 2`  
Output: `2`  
*Explanation: 2 is at index 2.*

### Thought Process (as if you’re the interviewee)  
First, realize that a brute-force solution would check every element for equality to target, which is O(n). But the mountain array structure allows optimization.

- **Step 1:** Use **binary search** to find the peak index.  
  Since the array increases then decreases, the peak is where `arr[i] > arr[i+1]` and `arr[i] > arr[i-1]`.  
- **Step 2:** Perform **binary search** on the left (increasing) half to find the target.  
  If found, return that index (since smaller indices come first).
- **Step 3:** If not found, perform **binary search** on the right (decreasing) half.  
  This half is in decreasing order, so adjust comparison accordingly.

This approach is chosen as it leverages the sorted nature of both array halves and ensures **O(log n)** time by performing three binary searches (each O(log n)).

### Corner cases to consider  
- Mountain array of length 3 (smallest possible), e.g. `[1,2,1]`.
- Target not present at all.
- Target at peak index.
- Target present in both halves (must return the leftmost/index).
- Repeated values at/near the peak (depending on constraints, but usually elements are unique except possibly at peak).
- Target at the first or last index.
- Only peak equals the target.

### Solution

```python
# Suppose MountainArray is a class with .get(index) and .length() methods.
# We do not have access to the array directly.

def findInMountainArray(target, mountain_arr):
    # Find the peak (maximum) index of the mountain array
    left, right = 1, mountain_arr.length() - 2
    while left <= right:
        mid = left + (right - left) // 2
        if mountain_arr.get(mid) < mountain_arr.get(mid + 1):
            left = mid + 1
        else:
            right = mid - 1
    peak = left
    
    # Binary search on the increasing part (0 to peak)
    l, r = 0, peak
    while l <= r:
        mid = l + (r - l) // 2
        value = mountain_arr.get(mid)
        if value == target:
            return mid
        if value < target:
            l = mid + 1
        else:
            r = mid - 1
    
    # Binary search on the decreasing part (peak+1 to end)
    l, r = peak + 1, mountain_arr.length() - 1
    while l <= r:
        mid = l + (r - l) // 2
        value = mountain_arr.get(mid)
        if value == target:
            return mid
        if value < target:
            r = mid - 1
        else:
            l = mid + 1
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n) overall, as each binary search (peak finding, both halves) is O(log n).
- **Space Complexity:** O(1). No extra storage used, only a constant number of variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you minimize the number of `.get` calls if each one is expensive?  
  *Hint: Cache values when possible, reduce redundant lookups.*

- Could you generalize this approach if the Mountain Array can have plateaus (equal elements at the peak region)?  
  *Hint: Modify your search logic to handle equal neighbors at the top.*

- What if you are given a rotated mountain array (rotation of a classic mountain array)?  
  *Hint: Consider how finding the peak and directional binary search would change.*

### Summary
This problem uses the **multiple binary search** pattern: once to find the peak, then two more to search both sorted (increasing and decreasing) subarrays.  
This pattern is commonly used in interview problems involving arrays with **multiple sorted regions** or **peak/valley** characteristics (e.g. find peak element, search bitonic sequence).  
The algorithm efficiently leverages the mountain array structure for optimal search.


### Flashcard
Binary search for peak index, then binary search on ascending left half, if not found binary search on descending right half; return smallest index found or -1.

### Tags
Array(#array), Binary Search(#binary-search), Interactive(#interactive)

### Similar Problems
- Peak Index in a Mountain Array(peak-index-in-a-mountain-array) (Medium)
- Minimum Number of Removals to Make Mountain Array(minimum-number-of-removals-to-make-mountain-array) (Hard)
- Find Good Days to Rob the Bank(find-good-days-to-rob-the-bank) (Medium)
- Find Indices of Stable Mountains(find-indices-of-stable-mountains) (Easy)