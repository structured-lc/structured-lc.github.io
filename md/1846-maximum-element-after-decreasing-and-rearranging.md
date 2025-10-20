### Leetcode 1846 (Medium): Maximum Element After Decreasing and Rearranging [Practice](https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging)

### Description  
Given an array of positive integers, you're allowed to rearrange the array and decrease any element (multiple times if needed) so that:
- The first element becomes 1.
- The absolute difference between any two adjacent elements is at most 1 (|arr[i] - arr[i-1]| ≤ 1 for 1 ≤ i < arr.length).

Return the **maximum possible value** in the array after these operations.

### Examples  

**Example 1:**  
Input: `arr = [2,2,1,2,1]`  
Output: `2`  
*Explanation: After rearranging and possibly decreasing, one possible array is [1,1,2,2,2]. Differences between adjacent values are all ≤ 1. The maximum element is 2.*

**Example 2:**  
Input: `arr = [100,1,1000]`  
Output: `3`  
*Explanation: Rearranged as [1,100,1000]. Set arr[1] = min(2,100) = 2, arr[2] = min(3,1000) = 3. Final array: [1,2,3], maximum is 3.*

**Example 3:**  
Input: `arr = [1,2,3,4,5]`  
Output: `5`  
*Explanation: The array already satisfies the property, so no changes needed. Maximum is 5.*

### Thought Process (as if you’re the interviewee)  
Let's break the problem into steps:

1. **Brute force idea:**  
   Try all reorderings and all possible decrements, but this is clearly not feasible due to high time complexity.

2. **Insight and greediness:**  
   - Since we can rearrange and *decrease* elements any number of times, bigger values can always be "shrunk" to what we need—never need to increase anything.
   - The best we can do is make arr=1, arr[1]=2, arr[2]=3, ..., but only if our input values are large enough to support those.
   - For each position i (0-indexed), after sorting the array, set arr[i] = min(arr[i], i+1). This ensures no two adjacent values differ by more than 1, and the first is 1.
   - The answer is just the max of this new array.

3. **Why this works:**  
   - By making arr=1 and every next arr[i]=min(arr[i], arr[i-1]+1), the difference is always ≤1 and it’s the most "increasing" you can legally get.

4. **Optimized Approach Chosen:**  
   - Sort the array.
   - Set first element to 1.
   - For each i>0, arr[i]=min(arr[i], arr[i-1]+1).
   - Return maximum in the final array.

This greedy pattern is optimal because larger values cannot "jump us ahead" — they can only allow us to keep extending the sequence; smaller values limit the range.

### Corner cases to consider  
- Array of length 1.
- All elements are the same.
- Already sorted consecutive array.
- Extremely large or small numbers in input.
- Elements are not initially in increasing order.
- Input contains many 1's.

### Solution

```python
def maximumElementAfterDecrementingAndRearranging(arr):
    # Step 1: Sort the array so we can process from smallest to largest
    arr.sort()
    # Step 2: Set the first element to 1
    arr[0] = 1
    # Step 3: For each subsequent element, set it to at most 1 greater than previous
    for i in range(1, len(arr)):
        arr[i] = min(arr[i], arr[i-1] + 1)
    # Step 4: The last (or max) element is our answer
    return max(arr)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) because of the sort. The single pass after sorting is O(n).
- **Space Complexity:** O(1) if we can modify the input array in-place; otherwise O(n) if a copy is made for safety.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you solve this problem without sorting if the numbers are already close to the possible range?
  *Hint: You might be able to use counting if all arr[i] ≤ n.*

- What if you are not allowed to modify the input array?
  *Hint: Simply work on a copy.*

- How would you handle negative numbers or zeros in the input?
  *Hint: Think about constraint violations; original input excludes zeros/negatives, but how would requirements change?*

### Summary
This problem uses a **greedy sorting and adjustment** approach. The major coding pattern is "sort, then process with local constraints," which is very common in problems where absolute differences or ranges are limited (e.g., forming consecutive sequences, scheduling). Similar logic appears in restoring arrays to sequences, “jump game” variants, and array normalization tasks.


### Flashcard
Sort array, set arr[i] = min(arr[i], arr[i−1]+1) starting with arr=1; answer is last element.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
