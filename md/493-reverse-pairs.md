### Leetcode 493 (Hard): Reverse Pairs [Practice](https://leetcode.com/problems/reverse-pairs)

### Description  
Given an integer array `nums`, return the number of **reverse pairs** in the array.  
A *reverse pair* is a pair of indices (i, j) such that:
- 0 ≤ i < j < nums.length
- nums[i] > 2 × nums[j]

Essentially, count how many pairs in the array satisfy that the first number is more than twice the second and appears before it.

### Examples  

**Example 1:**  
Input: `[1,3,2,3,1]`  
Output: `2`  
*Explanation: The reverse pairs are (1,4): 3 > 2×1 and (3,4): 3 > 2×1.*

**Example 2:**  
Input: `[2,4,3,5,1]`  
Output: `3`  
*Explanation: The reverse pairs are (1,4): 4>2×1, (2,4): 3>2×1, (3,4): 5>2×1.*

**Example 3:**  
Input: `[5,4,3,2,1]`  
Output: `4`  
*Explanation: The reverse pairs are (0,3): 5>2×2, (0,4): 5>2×1, (1,4): 4>2×1, (2,4): 3>2×1.*

### Thought Process (as if you’re the interviewee)  
First, let’s clarify the requirements and constraints:
- We need to count all (i, j) with 0 ≤ i < j < n, where nums[i] > 2 × nums[j].
- The naive approach would check each pair, leading to O(n²) time. That’s too slow for n up to 50,000.

#### Brute-force:
- For each i, for each j > i, check if nums[i] > 2 × nums[j].
- But for large n, this is far too slow.

#### Optimal (Modified Merge Sort):
- This problem is a variant of the classic *counting inversions* problem.
- The trick: Split the array, recursively count reverse pairs in each half, then count reverse pairs "across the halves" during the merge step.
- Because each half is sorted when we’re merging, we can efficiently count the number of satisfying pairs using two pointers.
- After counting, perform the usual merge (keeping the halves sorted).
- This will give us O(n log n) time.

#### Alternative approaches:
- Binary Indexed Tree (Fenwick Tree) or Segment Tree with discretization, but merge sort is more straightforward and doesn't require value compression or indexing.

### Corner cases to consider  
- Empty array ⇒ should return 0.
- Array of size 1 ⇒ should return 0.
- Arrays with duplicate numbers (e.g., [1,1,1,1]).
- Arrays with large/small (negative) values.
- Array sorted in ascending/descending order.
- All elements equal.
- Elements close to integer limits.

### Solution

```python
def reversePairs(nums):
    # Helper function for modified merge sort
    def merge_sort(left, right):
        if left >= right:
            return 0
        mid = (left + right) // 2
        count = merge_sort(left, mid) + merge_sort(mid + 1, right)
        
        # Count reverse pairs across the halves
        j = mid + 1
        for i in range(left, mid + 1):
            while j <= right and nums[i] > 2 * nums[j]:
                j += 1
            count += j - (mid + 1)
        
        # Merge step: merge [left, mid] and [mid+1, right]
        temp = []
        l, r = left, mid + 1
        while l <= mid and r <= right:
            if nums[l] <= nums[r]:
                temp.append(nums[l])
                l += 1
            else:
                temp.append(nums[r])
                r += 1
        while l <= mid:
            temp.append(nums[l])
            l += 1
        while r <= right:
            temp.append(nums[r])
            r += 1
        # Copy back to nums
        nums[left:right+1] = temp
        return count

    return merge_sort(0, len(nums) - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Each merge_sort call divides the array and combines results. Counting during merge is O(n), and there are log n levels of recursion.
- **Space Complexity:** O(n)  
  For the temporary array during merge and recursion stack (at most log n depth).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you wanted all the reverse pairs' indices, not just the count?  
  *Hint: Save the actual pairs during the counting step, but beware of extra space and complexity.*

- Can you solve this problem online (where numbers stream in and you must return the count at each step)?  
  *Hint: Consider Fenwick Tree (BIT) or balanced BST to handle streaming data; discretize values if necessary.*

- Could you solve this for any arbitrary k? That is, for nums[i] > k × nums[j] for a given k.  
  *Hint: Generalize the merge sort approach, replacing 2 with k.*

### Summary
This problem is a classic variant of the inversion-counting problem, best solved using the divide-and-conquer (modified merge sort) pattern. The core idea is that sorting halves lets us efficiently count cross-boundary pairs. This "merge and count" approach is a key pattern for similar problems, like counting local/global inversions, number of smaller elements after self, etc.


### Flashcard
Use modified merge sort; count reverse pairs during merge step where left element > 2 × right element.

### Tags
Array(#array), Binary Search(#binary-search), Divide and Conquer(#divide-and-conquer), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Merge Sort(#merge-sort), Ordered Set(#ordered-set)

### Similar Problems
- Count of Smaller Numbers After Self(count-of-smaller-numbers-after-self) (Hard)
- Count of Range Sum(count-of-range-sum) (Hard)