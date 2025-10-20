### Leetcode 2971 (Medium): Find Polygon With the Largest Perimeter [Practice](https://leetcode.com/problems/find-polygon-with-the-largest-perimeter)

### Description  
Given an array of positive integers `nums`, you are to select a subset of these numbers representing the sides of a polygon. The polygon must have at least three sides, and the sum of the lengths of all other sides must be strictly greater than the length of the longest side (polygon inequality). Your goal is to find the subset that forms a valid polygon with the largest possible perimeter. If no such subset exists, return -1.

### Examples  

**Example 1:**  
Input=`[1,2,3,4,5]`  
Output=`12`  
*Explanation: The longest side (5) must be less than the sum of the other sides (1 + 2 + 3 + 4 = 10). This does not satisfy the inequality, so we try subsets. The largest valid subset is [1, 2, 3, 4], with perimeter 1 + 2 + 3 + 4 = 10, but not including 5. Next, try [2, 3, 4, 5]: 5 < 2 + 3 + 4 = 9 → no, so check [2, 3, 4]: 4 < 2 + 3 = 5 → yes, perimeter 9. But try [3, 4, 5]: 5 < 3 + 4 = 7 → yes, perimeter 12, which is the largest possible.*

**Example 2:**  
Input=`[5,5,5]`  
Output=`15`  
*Explanation: All three sides are equal (5, 5, 5). 5 < 5 + 5 = 10 → valid triangle, perimeter is 15.*

**Example 3:**  
Input=`[1,2,3]`  
Output=`-1`  
*Explanation: 3 < 1 + 2 → 3 < 3 → not strictly greater, so no valid polygon can be formed.*

### Thought Process (as if you’re the interviewee)  
**Brute-force:**  
Generate all possible subsets of `nums` of size ≥ 3, check the polygon inequality for each, and keep track of the maximum perimeter encountered. This approach is correct but extremely inefficient.

**Optimized approach:**  
The key insight is that to maximize the perimeter under the polygon inequality, it’s optimal to consider the largest numbers first. So, sort the array in non-decreasing order and keep a running sum of the first k−1 elements. For each k starting from 3 up to n, check if the prefix sum is greater than the kᵗʰ element. The rationale is that if the sum of the first k−1 (smallest) elements is greater than the kᵗʰ (largest), the kᵗʰ element can serve as the longest side, and we can pick any k−1 elements as the other sides, satisfying the inequality. If not, we must try a smaller k. The algorithm stops at the largest valid k, which gives the maximum perimeter.

**Trade-offs:**  
This approach is significantly more efficient because, instead of checking all subsets, it leverages sorting and prefix sums to reduce the problem complexity from exponential to O(n log n) due to sorting.

### Corner cases to consider  
- **Empty array or array with fewer than 3 elements:** No polygon can be formed, return -1.
- **All elements the same:** Check if at least three exist and the polygon inequality holds.
- **Inputs with a single very large element:** Needs careful checking of the polygon inequality.
- **Array already sorted/unsorted:** Always sort to facilitate the greedy approach.
- **Duplicate elements:** The algorithm must handle them correctly after sorting.
- **Zero as an input:** Not present, as per the problem constraints.

### Solution

```python
def largestPerimeter(nums):
    nums.sort()
    prefix = 0
    res = -1
    for i in range(len(nums)):
        # Keep track of the prefix sum up to the i-th element,
        # When we check nums[i] as the largest possible longest side,
        # the sum prefix is the sum of all previous elements.
        if i >= 2 and prefix > nums[i]:
            res = prefix + nums[i]
        prefix += nums[i]
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting. The subsequent loop is O(n).
- **Space Complexity:** O(1) if only constant extra space is used (assuming in-place sorting is possible), otherwise O(n) for storing the sorted array.

### Potential follow-up questions  
- **What if the polygon is constrained to be convex? Does the same algorithm work?**  
  *Hint:* In a convex polygon, all interior angles are < 180°, but the polygon inequality still applies.
- **What if we want the number of valid polygons, not just the maximum perimeter?**  
  *Hint:* The algorithm can be adapted to count every subset of size ≥3 that satisfies the inequality, not just the maximum.
- **Can you extend this to allow sides to be non-positive integers?**  
  *Hint:* Negative or zero sides would complicate the polygon inequality and require additional boundary checks.

### Summary  
The problem is solved by sorting the array and using a greedy approach with prefix sums to efficiently find the largest valid perimeter. This pattern is similar to problems that involve checking sequence properties after sorting and is a common strategy for subset sum or sequence verification tasks, especially when the sum of a subset is compared against its largest element.


### Flashcard
Sort the array, then find the largest subset where the sum of the first k-1 elements is greater than the kᵗʰ element.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
- 3Sum Smaller(3sum-smaller) (Medium)
- Valid Triangle Number(valid-triangle-number) (Medium)