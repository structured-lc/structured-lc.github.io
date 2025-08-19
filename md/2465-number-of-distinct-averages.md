### Leetcode 2465 (Easy): Number of Distinct Averages [Practice](https://leetcode.com/problems/number-of-distinct-averages)

### Description  
Given an integer array **nums** of even length, keep removing the minimum and maximum element from the array, and compute the average of these two numbers each time. Continue until the array is empty. Your task is to count the number of **distinct averages** formed through this process.

### Examples  

**Example 1:**  
Input: `nums = [4,1,4,0,3,5]`  
Output: `2`  
*Explanation:  
Pairs: (0,5) → average 2.5,  
(1,4) → average 2.5,  
(3,4) → average 3.5.  
Distinct averages: 2.5, 3.5.*

**Example 2:**  
Input: `nums = [1,100]`  
Output: `1`  
*Explanation:  
Only one pair: (1,100) → average 50.5.  
Distinct averages: 50.5.*

**Example 3:**  
Input: `nums = [2,2,2,2]`  
Output: `1`  
*Explanation:  
Pairs: (2,2) → average 2.0 (twice).  
Distinct averages: 2.0.*

### Thought Process (as if you’re the interviewee)  
First, simulate the process exactly as described:  
- While the array is non-empty, repeatedly find and remove the minimum and maximum, recording the averages.

But this approach is inefficient because scanning for min and max is O(n) each time, with n/2 iterations.

**Optimized Approach:**  
- Since the elements are only ever paired from smallest and largest in each round, sorting the array up front allows us to efficiently form the pairs: (nums, nums[-1]), then (nums[1], nums[-2]), ..., until done.
- We can use a set to collect distinct averages.
- This makes the solution O(n log n) (from the sort), and then O(n) for forming the n/2 pairs.

**Trade-offs**:  
- Sorting is required, but the input isn't large (max array length 100), so sorting is optimal and straightforward here.
- Using a set for distinct averages is clear and efficient for small constraints.

### Corner cases to consider  
- Array already sorted or reverse-sorted.
- All elements equal, e.g., `[7,7,7,7]`.
- Only two elements.
- Array with maximum and minimum possible values.
- Duplicate values, but different distinct averages.

### Solution

```python
def distinctAverages(nums):
    # Sort the array to pair smallest and largest efficiently
    nums.sort()
    n = len(nums)
    seen = set()
    
    # Two pointers: left from start, right from end
    left, right = 0, n - 1
    
    while left < right:
        avg = (nums[left] + nums[right]) / 2
        seen.add(avg)
        left += 1
        right -= 1
    
    return len(seen)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) (mainly from sorting, pairing is O(n)).  
- **Space Complexity:** O(n) in the worst-case for the set storing distinct averages.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array was very large—could you avoid sorting?  
  *Hint: Can you pair min and max in linear time if using another data structure?*

- What if you needed to return the actual distinct averages, not just their count?  
  *Hint: Modify the output to return the set as a sorted list.*

- How would the solution change if the array length could be odd?  
  *Hint: What would pairing look like for a center element?*

### Summary
This problem follows the "two pointers" pattern on a sorted array to pair extremes in O(n) time after sorting. Using a set, it efficiently computes the number of unique results. This method applies to other pairing or matching problems where order or symmetry is involved, especially when the pairing always consists of symmetric elements (like min and max).

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), Sorting(#sorting)

### Similar Problems
- Two Sum(two-sum) (Easy)
- Finding Pairs With a Certain Sum(finding-pairs-with-a-certain-sum) (Medium)
- Minimum Average of Smallest and Largest Elements(minimum-average-of-smallest-and-largest-elements) (Easy)