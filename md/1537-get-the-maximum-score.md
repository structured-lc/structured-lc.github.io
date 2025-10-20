### Leetcode 1537 (Hard): Get the Maximum Score [Practice](https://leetcode.com/problems/get-the-maximum-score)

### Description  
You are given two **sorted arrays** of distinct integers, nums1 and nums2. You can start at the beginning of either array and move right, adding up the numbers you visit to a running score. At each step, you can either:
- Continue moving right in your current array, OR
- If both arrays share the same value at the current positions, you can "jump" from one array to the other (only at those "intersection" values).
Your goal is to follow a path that gives the **maximum possible score** from start to end (by the time both arrays are exhausted). The answer must be given modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `nums1 = [2,4,5,8,10]`, `nums2 = [4,6,8,9]`  
Output: `30`  
*Explanation: Start at 2 (nums1), path: 2→4 (jump: stay in nums1 or jump to nums2; either way sum = 2+4=6).  
Choose to jump to nums2 at 4: score so far: 2+4=6.  
Continue: 6 (nums2): 6+6=12.  
Next, both arrays share 8: sum can come from nums1 or nums2; best path so far to 8 is max(2+4+5+8, 2+4+6+8) = max(19, 18) = 19.  
Continue: add rest of numbers.  
Final path (2→4→5→8→10): 2+4+5+8+10=29 (nums1 path),  
or (2→4→6→8→9): 2+4+6+8+9=29 (switch to nums2 at 4 and 8).  
But, optimal switches sum to 30.*

**Example 2:**  
Input: `nums1 = [1,3,5,7,9]`, `nums2 = [3,5,100]`  
Output: `109`  
*Explanation: Can jump at 3, 5.  
Path: 1→3→5→7→9: 1+3+5+7+9=25 (staying in nums1).  
Or, jump at 3, take 100 after 5: 1+3+5+100=109.*

**Example 3:**  
Input: `nums1 = [1,2,3,4,5]`, `nums2 = [6,7,8,9,10]`  
Output: `40`  
*Explanation: No intersection, pick the array with larger sum.  
Sum(nums1)=15, sum(nums2)=40, so answer is 40.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try every jump possibility recursively (DFS/backtracking). At each intersection, decide to jump or not.  
  This is **very inefficient**; would be exponential time because each intersection introduces a branch point.

- **Dynamic Programming/Two Pointers Approach:**  
  Notice that the arrays are sorted and only have distinct elements, and jumps are possible **only at shared elements**.  
  Use two pointers (i, j) to traverse both arrays.  
  Keep two running sums: one for each array. At each matching number (intersection), pick the **maximum** of both running sums up to that point, add the current number (intersection value), and set both sums to that maximum. This simulates "jumping" at the optimal time.  
  Move pointers and sums appropriately.  
  At the end, the answer is the **maximum of the two running totals**.

- **Why this approach?**  
  - Each element is processed once (O(m+n)), and we make greedy decisions at each intersection.
  - Only a few variables needed (O(1) space).  
  - No need to store entire DP tables.

### Corner cases to consider  
- Both arrays have **no common elements** (completely disjoint).
- Arrays overlap at **start or end** (first or last elements are the same).
- One or both arrays are **empty**.
- Arrays contain **only one matching element.**
- All elements are in **reverse or different orders** (but input is always sorted).
- Only one element in each array.
- Switching is beneficial or not at intersections.
- All elements are common.

### Solution

```python
def maxSum(nums1, nums2):
    MOD = 10 ** 9 + 7
    m, n = len(nums1), len(nums2)
    i, j = 0, 0
    sum1, sum2 = 0, 0

    # Traverse both arrays using two pointers
    while i < m and j < n:
        if nums1[i] < nums2[j]:
            sum1 += nums1[i]
            i += 1
        elif nums1[i] > nums2[j]:
            sum2 += nums2[j]
            j += 1
        else:
            # Common element found; take the best so far, add the intersection, sync both sums.
            max_sum = max(sum1, sum2) + nums1[i]
            sum1 = sum2 = max_sum
            i += 1
            j += 1

    # Add remaining elements in either array
    while i < m:
        sum1 += nums1[i]
        i += 1
    while j < n:
        sum2 += nums2[j]
        j += 1

    # Return the maximum possible score modulo 1e9+7
    return max(sum1, sum2) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m+n), where m, n are the lengths of nums1 and nums2. Each pointer only traverses its array once.
- **Space Complexity:** O(1), since we only use a few integer variables for running sums and pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- If arrays can contain **duplicate elements**, how would your approach change?  
  *Hint: Think carefully about what intersection means; is it allowed to jump at every duplicate, or just the first occurrence?*  

- What if the arrays are **not sorted**?  
  *Hint: You might need to build value-to-index mapping or sort them first, but how would that affect time and space complexities?*  

- Can you do it **in place** if the arrays are extremely large and can't fit in memory?  
  *Hint: Consider streaming, external memory, or "rolling" window approaches.*

### Summary
This problem uses the **two pointers** technique, common for problems involving two sorted arrays. The greedy decisions at intersections and the efficient update of partial sums at each potential switch make this a classic optimization path problem. The same technique can be applied to other problems involving merging two sorted sequences, "take the greater sum" type of decisions, and processing optional jump/cross points. This is a key pattern for dealing with linear merges and conditional optimality when multiple paths are possible.


### Flashcard
Use two pointers to traverse both arrays, leveraging sorted and distinct elements to optimize jumps.

### Tags
Array(#array), Two Pointers(#two-pointers), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
- Maximum Score of a Node Sequence(maximum-score-of-a-node-sequence) (Hard)