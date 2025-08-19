### Leetcode 189 (Medium): Rotate Array [Practice](https://leetcode.com/problems/rotate-array)

### Description  
Given an integer array, rotate it to the right by k steps, where k is a non-negative integer. This means each element shifts to the right by k, and elements at the end wrap around to the beginning. You must do this in-place, modifying the input array with O(1) extra space. Think about how you’d shift all elements efficiently without using extra arrays.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5,6,7]`, `k = 3`  
Output: `[5,6,7,1,2,3,4]`  
*Explanation: The last 3 elements `[5,6,7]` are moved to the front. The original first 4 elements `[1,2,3,4]` follow them.*

**Example 2:**  
Input: `nums = [-1,-100,3,99]`, `k = 2`  
Output: `[3,99,-1,-100]`  
*Explanation: Rotate by 2 steps – last 2 elements `[3,99]` move to the front. The rest shift right.*

**Example 3:**  
Input: `nums = [1,2,3]`, `k = 4`  
Output: `[3,1,2]`  
*Explanation: k may be greater than array length. Since 4 mod 3 = 1, this is equivalent to rotating by 1 position. So array becomes `[3,1,2]`.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:** We could shift elements right one by one, k times. Each time, save the last element, move all others one position right, and place saved last value at start.  
    - Problem: For each rotation, shifting n elements. For k rotations, total time is O(n×k).  
    - If k is large, this is very inefficient.

- **Using extra array:** Create a temp array of size n. For each index i in nums, place it at index (i+k) % n in the temp. Copy temp back to nums.  
    - Time: O(n), Space: O(n). However, not allowed since we must do it in-place.

- **Optimal (three-reverse) method:**  
    - Reverse the whole array.
    - Reverse the first k elements.
    - Reverse the rest (from k to end).
    - Why does this work? After reversing the array, elements destined for the front end up at the back reversed; by reversing the splits, you restore their order at the new positions.
    - Works in-place with O(1) extra space and O(n) time. No auxiliary array needed.

### Corner cases to consider  
- k may be zero (no rotation needed).  
- k may be greater than array length (use k = k % n).  
- Empty array (`nums=[]`), or k=0.
- All elements the same (e.g. `[2,2,2,2]`).
- Array with only one element.
- k equal to array length (rotation unchanged).

### Solution

```python
def rotate(nums, k):
    """
    Rotates nums to the right by k steps in-place.
    """
    n = len(nums)
    if n == 0 or k % n == 0:
        return
    
    k = k % n  # In case k > n
    
    def reverse(start, end):
        # Helper to reverse elements in nums from start to end, inclusive.
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    
    # Step 1: Reverse the entire array
    reverse(0, n - 1)
    # Step 2: Reverse first k elements
    reverse(0, k - 1)
    # Step 3: Reverse the rest
    reverse(k, n - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we perform three passes that each reverse sections of the array, and each element is swapped at most once per pass.
- **Space Complexity:** O(1), as we only use a small constant number of pointers (start, end).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are allowed to use extra space, like a new array?
  *Hint: Try placing each number directly into its target position in a separate array and copy back.*
- How would you rotate the array to the left instead of to the right?
  *Hint: Try reversing and splitting in a similar way or just adjust the formula.*
- Can you come up with an algorithm to rotate the array k positions in O(k) time with O(1) space if k is very small compared to n?
  *Hint: Consider moving elements one-by-one similar to the brute-force approach.*

### Summary
This problem is a classic use-case for the **in-place array reversal trick**, which is a space-efficient way of rotating or shifting sequences. The underlying pattern—reverse, then reverse subparts—is common in array manipulation problems, and it applies to linked lists and strings as well. Understanding it can help in problems involving shifts, cyclic changes, or composing/splitting intervals.

### Tags
Array(#array), Math(#math), Two Pointers(#two-pointers)

### Similar Problems
- Rotate List(rotate-list) (Medium)
- Reverse Words in a String II(reverse-words-in-a-string-ii) (Medium)
- Make K-Subarray Sums Equal(make-k-subarray-sums-equal) (Medium)
- Maximum Number of Matching Indices After Right Shifts(maximum-number-of-matching-indices-after-right-shifts) (Medium)