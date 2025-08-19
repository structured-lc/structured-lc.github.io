### Leetcode 3371 (Medium): Identify the Largest Outlier in an Array [Practice](https://leetcode.com/problems/identify-the-largest-outlier-in-an-array)

### Description  
Given an integer array **nums** of size n, exactly n-2 elements are called **special numbers**. Of the two remaining elements, one is the **sum** of all the special numbers, and the other is the **outlier**. Identify and return the **largest** possible outlier value from the array.

- The indices of the special numbers, the sum element, and the outlier must all be distinct (but the values need not be unique).

In interview terms:  
*You are given an array where all but two elements come from a hidden set (“specials”). Of the two non-specials, one is the sum of all the “specials” and the other isn’t. The outlier is not the sum and not a special. Find the largest such number.*

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 6, 4]`  
Output: `6`  
*Explanation: Special numbers are 1, 2, 3, 4 (sum = 10), one non-special is 6 (outlier), the other is 6 (not the sum). Here, the only possible outlier is 6.*

**Example 2:**  
Input: `nums = [10, 3, 7, 20, 10]`  
Output: `20`  
*Explanation: Special numbers are 3, 7, 10, 10 (sum = 30), one non-special is 20, the other is 30. 20 is the outlier, 30 is the sum.*

**Example 3:**  
Input: `nums = [5, 5, 10, 15, 25]`  
Output: `25`  
*Explanation: Special numbers: 5, 5, 10, 15 (sum = 35), one non-special is 25 (outlier), other could be the sum (35), but since 25 is the only candidate for the outlier, return 25.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try removing each possible element as the outlier. For each removal, check if the remaining array contains a number that's the sum of its other elements (i.e., does “sum - removed = some value,” and that value exists in nums with a distinct index). This is O(n²) since we can scan for the sum each time.

- **Optimization insight:**  
  Since there's exactly one pair of “sum element + outlier,” and all other numbers are “special,”  
  Let total_sum = sum over all nums. If x is the outlier, then (total_sum - x) is the sum of specials + the possible “sum” element, so if we subtract x, the rest should comprise 1 sum element (let’s call it S) and all specials (whose sum is also S).

  This leads to:
    - total_sum - x = 2S  ⇒ S = (total_sum - x) // 2
    - S must actually appear (as a value) in nums (and on a different index from x).
    - Check if S is present after removing x (for count purposes).
    - Return the *largest* valid x found.

- **Why this works:**  
  This approach tries each candidate x as potential outlier, efficiently checks in O(1) time (via hashmap/counter) if the corresponding S exists, and always picks the largest x.

- **Trade-offs:**  
  - Assumes all combinations are possible; must check count for duplicates.
  - Efficient: O(n) time with a Counter.

### Corner cases to consider  
- Array with all equal elements (e.g., [7, 7, 7, 14, 21])
- Multiple duplicates of the outlier or sum
- Outlier equals a special number in value but not in index
- Negative numbers
- Maximum and minimum integer values
- Minimum possible array size (n = 3)

### Solution

```python
def getLargestOutlier(nums):
    # Count occurrences for existence checks
    count = {}
    for x in nums:
        count[x] = count.get(x, 0) + 1

    total_sum = sum(nums)
    outlier = float('-inf')

    for x in nums:
        # Remove current x for distinct index requirement
        count[x] -= 1
        remainder = total_sum - x

        # Check if possible to split remainder evenly
        if remainder % 2 == 0:
            S = remainder // 2
            # S must be in the remaining elements
            if count.get(S, 0) > 0:
                outlier = max(outlier, x)

        # Restore count for next iteration
        count[x] += 1
    return outlier
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  For each element (n iterations), all operations (sum, counter access) are O(1) or done once up front.

- **Space Complexity:** O(n)  
  For the counter/hashmap which may store up to n unique numbers.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find **all** possible outliers, not just the largest?  
  *Hint: Maintain a list of valid candidates as you iterate.*

- What if the input size (n) is very small or very large and you want to minimize space?  
  *Hint: Is in-place counting or early pruning possible?*

- Can you generalize for k outliers (not just 1)?  
  *Hint: What changes if more than one number is not a special or sum? Consider k unknowns.*

### Summary
This problem uses the **hashmap counting** and **mathematical reasoning** pattern that's common in problems where you need to reconstruct hidden properties from aggregate values (like sums or frequencies). The key is transforming the problem to an equation and checking each candidate efficiently. This pattern appears often in interview problems involving "find the missing/extra element," subset sums, or array reconstruction.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting), Enumeration(#enumeration)

### Similar Problems
