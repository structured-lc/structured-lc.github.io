### Leetcode 2161 (Medium): Partition Array According to Given Pivot [Practice](https://leetcode.com/problems/partition-array-according-to-given-pivot)

### Description  
Given an array `nums` and an integer `pivot`, rearrange the array so all elements less than `pivot` come before all elements greater than `pivot`, and all elements equal to `pivot` are placed between them. The relative order of elements less than and greater than the pivot must be preserved, as in the original array.

### Examples  

**Example 1:**  
Input: `nums = [9,12,5,10,14,3,10], pivot = 10`  
Output: `[9,5,3,10,10,12,14]`  
*Explanation: Elements < 10: [9,5,3], elements = 10: [10,10], elements > 10: [12,14]. Relative order is preserved within each group.*

**Example 2:**  
Input: `nums = [-3,4,3,2], pivot = 2`  
Output: `[-3, 2, 4, 3]`  
*Explanation: Elements < 2: [-3], elements = 2: [2], elements > 2: [4,3]. Relative order is preserved within each group.*

**Example 3:**  
Input: `nums = [1,2,3,4,5], pivot = 3`  
Output: `[1,2,3,4,5]`  
*Explanation: Elements < 3: [1,2], elements = 3: [3], elements > 3: [4,5]. Original order is preserved because array is already partitioned.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify that we need to partition into three sections: less than, equal to, and greater than the pivot, preserving the relative order within each group.

A brute-force way is to:
- Iterate over `nums`, adding elements to three separate lists: less, equal, and greater.
- Combine the three lists.

This avoids in-place swaps, which would break stability (relative order). Using three new arrays makes it clear, simple, and linear in time complexity.

Next, I’d briefly consider optimizing for space. In-place, stable partitioning is complicated and usually not better for interviews unless specifically requested. The simple three-list method is justified since time and stability are prioritized.

### Corner cases to consider  
- Empty array (`nums=[]`)
- Single element array (`nums` has one value, equal to/below/above pivot)
- All elements are the same as pivot
- All elements are less than or all greater than pivot
- Large values, negative numbers, zeros

### Solution

```python
def pivotArray(nums, pivot):
    # Separate lists for < pivot, == pivot, and > pivot
    less = []
    equal = []
    greater = []

    for num in nums:
        if num < pivot:
            less.append(num)
        elif num == pivot:
            equal.append(num)
        else:
            greater.append(num)

    # Combine and return the three lists in order
    return less + equal + greater
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `nums`. We pass through the list once, and combining the lists is O(n).
- **Space Complexity:** O(n), using three additional arrays, each up to n elements in total.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you solve this in-place while preserving order?
  *Hint: Try to simulate the process using pointers, but note that stable partitioning usually requires extra space.*

- How would a single-pass, in-place, unstable solution look?
  *Hint: Use two pointers to partition, but don’t preserve order inside each part.*

- Can you generalize this for more than three partitions?
  *Hint: Consider distributing elements by range or buckets, and merging at the end.*

### Summary
This problem uses the stable, multi-pointer partitioning pattern: collect elements into multiple lists/buckets and merge. The approach is similar to "Dutch National Flag" or "Sort Colors" but stability is required, so extra space makes the logic straightforward and safe. This coding pattern is useful whenever you need to partition while maintaining original order.