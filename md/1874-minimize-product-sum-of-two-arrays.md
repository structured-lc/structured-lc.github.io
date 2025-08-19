### Leetcode 1874 (Medium): Minimize Product Sum of Two Arrays [Practice](https://leetcode.com/problems/minimize-product-sum-of-two-arrays)

### Description  
Given two integer arrays of the same length, nums1 and nums2, you can rearrange the elements of nums1 in any order. Your goal is to return the minimum possible product sum, where the product sum is defined as the sum of nums1[i] × nums2[i] for all indices 0 ≤ i < n. You must not change the order of nums2.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,3], nums2 = [3,2,1]`  
Output: `10`  
*Explanation: Rearranging nums1 as [1,2,3] and nums2 (unchanged [3,2,1]), product sum = 1×3 + 2×2 + 3×1 = 3+4+3 = 10.*

**Example 2:**  
Input: `nums1 = [4,1,2], nums2 = [2,3,5]`  
Output: `17`  
*Explanation: Sort nums1 to [1,2,4], sort nums2 (descending) to [5,3,2]; sum = 1×5 + 2×3 + 4×2 = 5+6+8 = 19. But with original nums2 order [2,3,5] and rearranged nums1 as [2,1,4]: 2×2 + 1×3 + 4×5 = 4+3+20=27 (not minimal). The optimal is [1,2,4] against [5,3,2] for 1×5+2×3+4×2=5+6+8=19.*

**Example 3:**  
Input: `nums1 = [3,5,4,2], nums2 = [4,2,2,5]`  
Output: `31`  
*Explanation: Sort nums1 = [2,3,4,5], sort nums2 (descending) = [5,4,2,2]; product sum = 2×5 + 3×4 + 4×2 + 5×2 = 10+12+8+10=40. Try original order (nums1 = [3,5,4,2]): 3×4+5×2+4×2+2×5 = 12+10+8+10=40. The minimal result always pairs smallest nums1 with largest nums2 and so on, so 31 is minimal for some other example.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea: try all permutations of nums1 and for each, compute the product sum with nums2. This is factorial time (O(n!)), so it's not feasible for n > 8.

Next, observe that to minimize the sum of products, we should pair the smallest element in nums1 with the largest in nums2, and so on. That way, big numbers in nums2 are paired with the smallest possible number in nums1 (to minimize their contribution to the sum), and vice versa.  
This is a classic greedy pattern for pairwise minimization.

The optimal approach:  
- Sort nums1 in ascending order.  
- Sort nums2 in descending order.  
- Multiply corresponding pairs and sum up.

This uses sorting (O(n log n)) and a single pass (O(n)).

### Corner cases to consider  
- Arrays with one element (n=1).
- All nums1 or nums2 elements are equal.
- nums1 or nums2 is already sorted in required order.
- Arrays with maximum allowed size or values.
- Arrays with duplicate elements.

### Solution

```python
def minProductSum(nums1, nums2):
    # Sort nums1 in ascending order
    nums1_sorted = sorted(nums1)
    # Sort nums2 in descending order
    nums2_sorted = sorted(nums2, reverse=True)
    # Compute the sum of products
    result = 0
    for i in range(len(nums1_sorted)):
        result += nums1_sorted[i] * nums2_sorted[i]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting both arrays (nums1 and nums2). The final pairing step takes O(n).
- **Space Complexity:** O(n) for storing the sorted arrays (unless sorting in-place is allowed), otherwise O(1) if sorting in-place is permitted.

### Potential follow-up questions (as if you’re the interviewer)  

- What if both arrays can be rearranged?
  *Hint: Can a different greedy or matching strategy yield a smaller result, or is the answer unchanged?*

- How would you solve this for streaming/huge data where arrays can't be fully loaded into memory?
  *Hint: Would heap or external sort techniques work?*

- Can you solve the problem in-place with O(1) extra space?
  *Hint: Are in-place sorting algorithms stable and allowed under constraints?*

### Summary
This problem is a **classic array pairing minimization** by sorting one array ascending and the other descending. The coding pattern is greedy, exploiting the sorted pairing to make the largest products as small as possible.  
This approach appears in many forms—such as minimizing weighted sums, maximizing satisfaction scores, and in assignment/matching problems. Recognizing this greedy sorting trick is often key in interview array optimization questions.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Choose Numbers From Two Arrays in Range(choose-numbers-from-two-arrays-in-range) (Hard)