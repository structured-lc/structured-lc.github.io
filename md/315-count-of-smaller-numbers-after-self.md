### Leetcode 315 (Hard): Count of Smaller Numbers After Self [Practice](https://leetcode.com/problems/count-of-smaller-numbers-after-self)

### Description  
You’re given an integer array **nums**. For each element in the array, your task is to determine **how many numbers to its right are smaller than itself**.  
In other words, for every index *i*, you want to find the count of elements at positions *j > i* where **nums[j] < nums[i]**.  
Return an array **counts** such that **counts[i]** is this number for every position *i* in **nums**.

### Examples  

**Example 1:**  
Input: `[5,2,6,1]`  
Output: `[2,1,1,0]`  
*Explanation:*
- For 5, two values to its right (2 and 1) are smaller ⇒ 2  
- For 2, only one value to its right (1) is smaller ⇒ 1  
- For 6, only one value to its right (1) is smaller ⇒ 1  
- For 1, none to its right ⇒ 0

**Example 2:**  
Input: `[1,2,3]`  
Output: `[0,0,0]`  
*Explanation:*
- Each element has no smaller numbers to its right.

**Example 3:**  
Input: `[3,3,2,2,1]`  
Output: `[3,2,1,1,0]`  
*Explanation:*
- For the 1st 3, there are three smaller elements to the right (2,2,1).
- For the 2nd 3, two elements to right are smaller (2,1).
- For the first 2, (2,1), only one (1) is smaller.
- For the next 2, only (1) is smaller.
- For the last 1, none is smaller to the right.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each element, scan all elements to its right to count smaller numbers.  
  This is simple: Use two nested loops, O(n²) time.

- **Optimize:**  
  The bottleneck is repeated scanning.  
  Is there a way to maintain a running structure to quickly count, as I process from right to left?

  - **Binary Search Trees (BST) or Binary Indexed Tree (Fenwick Tree):**  
    Building a BST or using a Fenwick Tree to keep track of elements processed so far; for each new number (scanning right to left),  
    find out how many numbers already inserted are less than the current value.
  - **Merge Sort-based Counting:**  
    Similar to counting inversions, modify merge sort: As you merge, count how many elements “jump over” each other.  
    This achieves O(n log n).

  - **Why Merge Sort (Chosen):**  
    - Clean O(n log n) approach  
    - No need for careful rebalancing (like BST) and handles duplicates well

### Corner cases to consider  
- **Empty array:** Output should be []
- **One element:** Output should be 
- **All elements equal:** Output should be all 0
- **Strictly decreasing array:** Output should be [n-1, n-2, ..., 0]
- **Strictly increasing array:** Output should be all 0
- **Large arrays (10⁵ elements):** Need efficient solution

### Solution

```python
def countSmaller(nums):
    # Each element is (num, original_index)
    nums_indexed = [(num, idx) for idx, num in enumerate(nums)]
    counts = [0] * len(nums)
    
    def merge_sort(enum):
        mid = len(enum) // 2
        if mid:  # If length > 1
            left = merge_sort(enum[:mid])
            right = merge_sort(enum[mid:])
            merged = []
            i = j = 0
            # Count elements from right that are less than left
            while i < len(left) or j < len(right):
                if j == len(right) or (i < len(left) and left[i][0] > right[j][0]):
                    # left[i] is bigger than everything in right[:j]
                    counts[left[i][1]] += j
                    merged.append(left[i])
                    i += 1
                else:
                    merged.append(right[j])
                    j += 1
            return merged
        else:
            return enum

    merge_sort(nums_indexed)
    return counts
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Each divide step divides the list in half, and merging is linear per merge.
  - Total work is proportional to n log n.

- **Space Complexity:** O(n)  
  - Extra storage for the merged lists and the counts array, and call stack goes up to log n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you do this if the array is streaming (not given all at once)?  
  *Hint: Consider using a dynamic data structure, like a BST or a Fenwick Tree, to insert and count on the fly.*

- Can you solve this in-place?  
  *Hint: With merge sort, you need extra storage for merging; can you optimize or simulate in-place merging?*

- What if you’re asked for "count of greater numbers after self" instead?  
  *Hint: Flip the comparison direction in merge or BST logic.*

### Summary
This problem is a classic **"modified merge sort / counting inversions"** question.  
The coding pattern—“count while merging”—is powerful for any scenario where you need to tally values that satisfy a relation to values *after* a given index.  
It's widely applicable for inversion counts, “for each i, how many j > i <condition>” types of problems, and is a fundamental divide & conquer pattern.  
Alternative patterns: BST/Order Statistic Tree, Fenwick Tree—also work well in streaming or real-time scenarios.

### Tags
Array(#array), Binary Search(#binary-search), Divide and Conquer(#divide-and-conquer), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Merge Sort(#merge-sort), Ordered Set(#ordered-set)

### Similar Problems
- Count of Range Sum(count-of-range-sum) (Hard)
- Queue Reconstruction by Height(queue-reconstruction-by-height) (Medium)
- Reverse Pairs(reverse-pairs) (Hard)
- How Many Numbers Are Smaller Than the Current Number(how-many-numbers-are-smaller-than-the-current-number) (Easy)
- Count Good Triplets in an Array(count-good-triplets-in-an-array) (Hard)
- Count the Number of K-Big Indices(count-the-number-of-k-big-indices) (Hard)