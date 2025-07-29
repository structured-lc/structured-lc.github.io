### Leetcode 360 (Medium): Sort Transformed Array [Practice](https://leetcode.com/problems/sort-transformed-array)

### Description  
Given a **sorted** array of integers `nums`, and three integers **a**, **b**, and **c**, you need to return a new array of the same length where each element is the result of applying the quadratic function `f(x) = a×x² + b×x + c` to every element `x` in nums. The new array must also be **sorted in ascending order**.  
Think of this as: "Here’s a sorted array, and I need to apply a mathematical transformation, but I want the result still sorted. How can I do it efficiently?"

### Examples  

**Example 1:**  
Input: `nums = [-4, -2, 2, 4], a = 1, b = 3, c = 5`  
Output: `[3, 9, 15, 33]`  
*Explanation: f(x) = 1×x² + 3×x + 5 → f(-4)=3, f(-2)=9, f(2)=15, f(4)=33. The results are already sorted.*

**Example 2:**  
Input: `nums = [-4, -2, 2, 4], a = -1, b = 3, c = 5`  
Output: `[-23, -5, 1, 7]`  
*Explanation: f(x) = -1×x² + 3×x + 5 → f(-4)=-23, f(-2)=-5, f(2)=1, f(4)=7. The results, after applying f to every x, are sorted.*

**Example 3:**  
Input: `nums = [0, 1, 2, 3, 4], a = 0, b = 1, c = 0`  
Output: `[0, 1, 2, 3, 4]`  
*Explanation: f(x) = x. Numbers remain the same and sorted.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Just loop through all numbers, apply the function, and then sort the result. This works, but is less efficient (O(n log n)), and doesn’t take advantage of the fact that the input array is sorted.

- **Optimized approach:**  
  Notice that the quadratic function, depending on the leading coefficient `a`, will create either a "cup" (upward parabola, a > 0) or a "cap" (downwards, a < 0). For a parabola:
  - If **a > 0**: the minimum is in the middle, outputs grow larger at both ends. So, we’ll want to fill from the end of the output array (two-pointer approach).
  - If **a < 0**: the maximum is in the middle, outputs are largest at both ends, smallest near the middle. So, we’ll want to fill the output array from the front.
  - If **a == 0**: this reduces to a linear function; either it increases (b ≥ 0, just keep order) or decreases (b < 0, reverse the array).
  - Use two pointers (`left`, `right`), compare f(nums[left]) and f(nums[right]), insert appropriately into output.
  - This way, we get O(n) time.

### Corner cases to consider  
- Empty array: input is []
- Array with one element
- All numbers are equal
- a == 0 and b == 0 (so function is always c)
- a == 0 but b < 0 (linear, decreasing)
- Very large positive/negative numbers (potential overflow in other languages)
- nums contains negative and positive, zero, etc.

### Solution

```python
def sortTransformedArray(nums, a, b, c):
    def f(x):
        return a * x * x + b * x + c

    n = len(nums)
    res = [0] * n
    left, right = 0, n - 1
    idx = n - 1 if a >= 0 else 0

    while left <= right:
        left_val = f(nums[left])
        right_val = f(nums[right])

        if a >= 0:
            if left_val > right_val:
                res[idx] = left_val
                left += 1
            else:
                res[idx] = right_val
                right -= 1
            idx -= 1
        else:
            if left_val < right_val:
                res[idx] = left_val
                left += 1
            else:
                res[idx] = right_val
                right -= 1
            idx += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Only one pass through the array using two pointers.
  - Each element is computed and placed into the result array exactly once.

- **Space Complexity:** O(n)  
  - Output array of size n is required for the result.
  - Only constant extra space otherwise.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the input array is **not sorted**?  
  *Hint: Would your approach still work efficiently? If not sorted, you'll need to sort either before or after transformation.*

- Can you do this **in-place** instead of allocating additional space?  
  *Hint: Consider if it's possible given function values and need for sorting—possible if in-place sorting is allowed, otherwise extra space is needed.*

- How would this change for a **cubic function** or other general polynomials?  
  *Hint: Cubic or higher degree polynomials can have more than two monotonic intervals. Two-pointer technique will not always suffice; extra sorting or further analysis needed.*

### Summary
This problem uses the **two-pointer pattern** for arrays with a monotonic property (here, transformed by a quadratic) to fill an output array efficiently based on the function’s shape. This pattern often appears when merging, reversing, or reconciling different sorted sections of data—common also in problems like "Merge Sorted Array", "Squares of a Sorted Array", etc. Recognizing properties of monotonicity and function behavior enables performance gains over brute force approaches.