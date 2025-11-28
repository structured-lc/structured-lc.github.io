# [Practice](https://leetcode.com/problems/maximize-expression-of-three-elements)

### Description

You are given an integer array `nums` of length at least 3. You need to choose three elements `a`, `b`, and `c` from `nums` at distinct indices such that the expression `a + b - c` is maximized. Return the maximum possible value of this expression.

### Examples

**Example 1:**
Input: `nums = [2, 1, 3]`
Output: `4`
Explanation: Choose a = 3, b = 2, c = 1. The expression is 3 + 2 - 1 = 4.

**Example 2:**
Input: `nums = [5, 3, 1, 6]`
Output: `10`
Explanation: Choose a = 6, b = 5, c = 1. The expression is 6 + 5 - 1 = 10.

**Example 3:**
Input: `nums = [1, 2, 3, 4, 5]`
Output: `8`
Explanation: Choose a = 5, b = 4, c = 1. The expression is 5 + 4 - 1 = 8.

### Thought Process (as if you're the interviewee)

To maximize `a + b - c`, I need to think about what makes this expression large:
- Since we're adding `a` and `b`, I want them to be as large as possible
- Since we're subtracting `c`, I want it to be as small as possible

**Brute Force Approach:** I could try all possible combinations of three distinct indices and calculate the expression for each, keeping track of the maximum. This would be O(n³) in the worst case.

**Optimized Approach:** If I sort the array, the two largest elements will be at the end, and the smallest element will be at the beginning. After sorting, I can simply take:
- `a = nums[n-1]` (largest)
- `b = nums[n-2]` (second largest)
- `c = nums` (smallest)

This works because sorting allows me to directly access the optimal values without checking all combinations. The time complexity improves to O(n log n).

**Why this works:** The problem doesn't require the indices to satisfy any ordering constraints (like i < j < k). We just need distinct indices. Therefore, picking the two maximum values and the one minimum value will always give us the maximum expression value.

### Corner cases to consider

- All elements are the same: The result would be `2 × value - value = value`
- Array has exactly 3 elements: We must use all three elements
- Negative numbers: The "largest" and "smallest" are determined by value, not absolute magnitude
- Large range of values: Sorting handles any range correctly

### Solution

```python
def maximizeExpression(nums):
    # Sort the array to identify largest and smallest elements
    nums.sort()
    
    # Pick the two largest elements for a and b
    # Pick the smallest element for c
    a = nums[-1]        # Last element (largest)
    b = nums[-2]        # Second-to-last (second largest)
    c = nums[0]         # First element (smallest)
    
    # Calculate and return the maximized expression
    return a + b - c
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(n log n) — The sorting operation dominates. After sorting, accessing elements by index is O(1), and computing the result is O(1). Therefore, the overall complexity is determined by the sort.

- **Space Complexity:** O(1) or O(n) depending on the sorting algorithm — If we use an in-place sort (like quicksort), it's O(log n) for the recursion stack. If we consider the input array itself, some might count it as O(n), but typically we don't count the input space. Most implementations will use O(log n) to O(n) for sorting overhead.

### Potential follow-up questions

- (What if we cannot modify the input array?)
  *Hint: You could create a copy before sorting, or find the maximum/minimum values without sorting.*

- (Can you solve this in O(n) time without sorting?)
  *Hint: Make a single pass through the array to track the two largest values and the one smallest value.*

- (What if the expression was `a - b + c` instead?)
  *Hint: Think about which values should be maximized and which should be minimized for this new expression.*

### Summary

This problem demonstrates the importance of **mathematical insight** before jumping into code. Rather than brute-forcing all combinations, recognizing that we want to maximize the sum of two terms and minimize the subtracted term allows us to use a simple sorting approach. This pattern applies whenever you need to optimize expressions with mixed operations (additions and subtractions) — identify which variables contribute positively and which negatively, then pick accordingly. The greedy strategy of selecting extremes (max and min) is valid when there are no positional constraints on the indices.


### Flashcard
To maximize a+b−c, choose two largest elements for a,b and smallest for c; try all combinations or use sorting.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Enumeration(#enumeration)

### Similar Problems
