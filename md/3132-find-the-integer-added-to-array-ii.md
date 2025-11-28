### Leetcode 3132 (Medium): Find the Integer Added to Array II [Practice](https://leetcode.com/problems/find-the-integer-added-to-array-ii)

### Description  
You are given two integer arrays, nums1 and nums2. From nums1, exactly two elements have been removed, and then **the same integer x** has been added to all the remaining elements, forming nums2 (order may not be preserved). Your task is to find the **minimum possible integer x** that could have been added so that after the removals and addition of x, nums1 becomes equal to nums2 (as multisets: same numbers with same frequency, possibly re-ordered).

### Examples  

**Example 1:**  
Input: `nums1 = [2, 4, 6, 8, 10]`, `nums2 = [8, 10, 12]`
Output: `2`
Explanation:  
- Remove 2 and 4 from nums1 → [6, 8, 10]  
- Now, adding x=2 to each: [8, 10, 12], which matches nums2.

**Example 2:**  
Input: `nums1 = [1, 2, 3, 4, 5]`, `nums2 = [4, 5, 6]`
Output: `1`
Explanation:  
- Remove 1 and 2 → [3, 4, 5]  
- Adding x=1 results in [4, 5, 6], matching nums2.

**Example 3:**  
Input: `nums1 = [7, -2, 0, 2, 3]`, `nums2 = [8, 3, 4]`
Output: `1`
Explanation:
- Remove 7 and -2 → [0, 2, 3]
- Adding x=1 → [1, 3, 4], which as a multiset is equal to nums2 (after sorting).

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all ways to remove 2 elements from nums1 (O(n²)), shift the rest to see if one integer x makes shifted nums1 match nums2 after sorting. This is slow and not scalable for n up to 10⁵.

- **Optimization:**  
  Sort both arrays. The two elements that are missing must be among the first three in nums1 compared to nums2 when sorted:
    - Let m = len(nums2)
    - For each “removal case” (removing 2 elements among the first three of sorted nums1), the smallest adjusted number in nums1 must be mapped to the smallest in nums2.
    - Try possible removals, calculate x = nums2 - nums1[i] for i ∈ {0, 1, 2}, remove nums1[i] and one other in {0,1,2} (not i), and check if (remaining elements + x) equals nums2 as multisets.

- **Why does this work?**  
  Since only two elements are removed, after sorting, the smallest element in nums2 corresponds to one of the three smallest in nums1 (with x added).

- **Final Approach (Two pointers + Sort):**
  - Sort nums1 and nums2.
  - For all pairs (i, j), where 0 ≤ i < j ≤ 2 (the 3 smallest nums1 elements), remove nums1[i] and nums1[j], compute x as the difference between nums2 and the smallest of the remaining in nums1 (after removals), then confirm if applying x to all remaining elements gives nums2.

- **Trade-off:**  
  Total O(n log n) for sort. For each removal combination (constant, since only 3 choose 2 = 3), O(n) to validate match.

### Corner cases to consider  
- nums1 or nums2 have negative numbers.
- nums1 or nums2 not sorted.
- Multiple possible x values; must return the minimum.
- Duplicates in nums1 or nums2.
- Already matching with x=0.
- All elements in nums1 equal.

### Solution

```python
def findIntegerAdded(nums1, nums2):
    # Sort both arrays for ordered comparison
    nums1.sort()
    nums2.sort()
    n, m = len(nums1), len(nums2)
    min_x = float('inf')

    # Try removing each pair of two elements within the first 3 in nums1
    for i in range(3):
        for j in range(i+1, 3):
            # Build candidate after removing nums1[i] and nums1[j]
            temp = []
            for k in range(n):
                if k != i and k != j:
                    temp.append(nums1[k])

            # Compute candidate x so that temp[0] + x == nums2[0]
            candidate_x = nums2[0] - temp[0]

            # Check if adding x to every element gives nums2
            ok = True
            for idx in range(m):
                if temp[idx] + candidate_x != nums2[idx]:
                    ok = False
                    break

            if ok:
                min_x = min(min_x, candidate_x)
    return min_x
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), due to sorting nums1 and nums2. The double for-loop is on constant (max 3 choose 2 = 3), and each validation over all entries is O(n).
- **Space Complexity:** O(n), mainly for the extra temp list to hold a candidate nums1 after removals.

### Potential follow-up questions (as if you’re the interviewer)  

- What if more than two numbers were removed?  
  *Hint: Try to generalize the removal pattern for k elements. Can your constant time validation scale?*

- Can you solve this problem if the arrays are too large to fit in memory?  
  *Hint: Think about offline/online streaming and external memory sort, or processing in chunks.*

- Can you optimize for the minimum number of operations if the length difference is not always exactly two?  
  *Hint: Think about the formulation if the cardinality of nums2 is not fixed WRT nums1.*

### Summary
This solution uses the “two pointers after sort” technique, reducing the problem to matching sorted arrays after removing two elements and shifting. The pattern of fixing the shift (difference) and validating by multi-set comparison arises in other difference array or “missing elements” problems, and the overall strategy is common when a small constant number of modifications (removals) is involved. This pattern extends to similar questions about matching transformed arrays after small removals or insertions.


### Flashcard
Sort both arrays; try removing each pair among the first three elements of sorted_nums1, then check if remaining elements match sorted_nums2 with a single x.

### Tags
Array(#array), Two Pointers(#two-pointers), Sorting(#sorting), Enumeration(#enumeration)

### Similar Problems
