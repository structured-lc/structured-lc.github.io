### Leetcode 1385 (Easy): Find the Distance Value Between Two Arrays [Practice](https://leetcode.com/problems/find-the-distance-value-between-two-arrays)

### Description  
Given two integer arrays arr1 and arr2, and an integer d, return the distance value between the two arrays. The distance value is defined as the number of elements arr1[i] for which there is no element arr2[j] such that |arr1[i] - arr2[j]| ≤ d.

### Examples  

**Example 1:**  
Input: `arr1 = [4,5,8]`, `arr2 = [10,9,1,8]`, `d = 2`  
Output: `2`  
*Explanation: For arr1=4: abs(4-10)=6, abs(4-9)=5, abs(4-1)=3, abs(4-8)=4 (all >2). For arr1[1]=5: similar. For arr1[2]=8: abs(8-8)=0 (≤2). Only arr1 and arr1[1] satisfy the condition. Result=2.*

**Example 2:**  
Input: `arr1 = [1,4,2,3]`, `arr2 = [-4,-3,6,10,20,30]`, `d = 3`  
Output: `2`  
*Explanation: arr1=1 is close to -3; arr1[1]=4 is not close to any arr2[j]. arr1[2]=2 is close to -4; arr1[3]=3 is not close to any arr2[j]. Only arr1[1], arr1[3] count.*

**Example 3:**  
Input: `arr1 = [2,1,100,3]`, `arr2 = [-5,-2,10,-3,7]`, `d = 6`  
Output: `1`  
*Explanation: Only arr1[2]=100 has no arr2[j] such that |100-…| ≤ 6.*

### Thought Process (as if you’re the interviewee)  
The brute force solution checks for every arr1[i] if all arr2[j] are "far enough". To speed up, sort arr2. For each arr1[i], use binary search to check if any arr2[j] is within d of arr1[i].

### Corner cases to consider  
- arr1 or arr2 is empty
- Large d (covers all elements), or d = 0
- Repeated elements in arr1 or arr2

### Solution

```python
import bisect

def findTheDistanceValue(arr1, arr2, d):
    arr2.sort()
    res = 0
    for x in arr1:
        # Find insert position
        i = bisect.bisect_left(arr2, x)
        too_close = False
        # Check arr2[i-1] and arr2[i] if in range
        if i > 0 and abs(x - arr2[i-1]) <= d:
            too_close = True
        if i < len(arr2) and abs(x - arr2[i]) <= d:
            too_close = True
        if not too_close:
            res += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log m), where n = len(arr1), m = len(arr2) (for sorting and binary search).
- **Space Complexity:** O(1) extra (except to sort arr2, which can be done in-place).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if arr2 is very large and you can't sort it?  
  *Hint: Use a set and scan a range.*

- Can you do it in one pass if arr1 and arr2 are both sorted?  
  *Hint: Two pointers approach.*

- What if you want the minimum such d so that all distances are less than or equal to d?  
  *Hint: Think inversion of the problem and binary search on d.*

### Summary
This is a classic application of binary search for window/range queries on a sorted array, a common interview technique for distance/separation types of questions.