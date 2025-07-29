### Leetcode 1090 (Medium): Largest Values From Labels [Practice](https://leetcode.com/problems/largest-values-from-labels)

### Description  
Given two arrays, **values** and **labels**, where `values[i]` is the value and `labels[i]` is the label for the iᵗʰ item, your task is to select a subset of items to maximize the total value.  
Selection constraints:
- You can select at most **numWanted** items in total.
- For any distinct label, you can select at most **useLimit** items with that label.
Return the largest possible sum you can achieve under these rules.

### Examples  

**Example 1:**  
Input: `values = [5,4,3,2,1], labels = [1,1,2,2,3], numWanted = 3, useLimit = 1`  
Output: `9`  
*Explanation: We choose the items with values 5 (label 1), 3 (label 2), and 1 (label 3). Each label occurs once, and total items ≤ 3.*

**Example 2:**  
Input: `values = [5,4,3,2,1], labels = [1,3,3,3,2], numWanted = 3, useLimit = 2`  
Output: `12`  
*Explanation: Choose 5 (label 1), 4 (label 3), and 3 (label 3). We use label 3 twice (limit is 2) and one of label 1.*

**Example 3:**  
Input: `values = [9,8,8,7,6], labels = [0,0,0,1,1], numWanted = 3, useLimit = 1`  
Output: `16`  
*Explanation: Select 9 (label 0), 7 (label 1). Only one from label 0 and one from label 1, so only two items can be picked. Total = 16.*

**Example 4:**  
Input: `values = [9,8,8,7,6], labels = [0,0,0,1,1], numWanted = 3, useLimit = 2`  
Output: `24`  
*Explanation: Pick 9, 8 (both label 0), and 7 (label 1). Label 0 picked twice (within limit), label 1 once.*

### Thought Process (as if you’re the interviewee)  
First, I'd try to *greedily* maximize the sum by always choosing the item with the highest remaining value.  
However, I need to keep track of two constraints:
- Don’t exceed **numWanted** items.
- For any label, don’t choose more than **useLimit** items.

**Brute-force:** Try all subsets — but with up to 20,000 items, that's infeasible.

**Optimized plan:**  
- Pair each value with its label.
- **Sort** all pairs by value in descending order.
- Iterate from largest to smallest value:
  - For each item, only pick it if we haven't exceeded **useLimit** for that label.
  - Stop if we have picked up to **numWanted** items.

This greedy approach works because taking larger values earlier helps maximize the sum, and both constraints are enforced for each label and total count[1][2][3].

### Corner cases to consider  
- All items have the same label, and useLimit < numWanted.
- numWanted or useLimit is 0 (no selections).
- All values are zero or negative (if allowed).
- Multiple items have the same value.
- There are fewer total items available than numWanted.

### Solution

```python
def largestValsFromLabels(values, labels, numWanted, useLimit):
    # Pair each value with its corresponding label
    items = list(zip(values, labels))
    
    # Sort the items in descending order by value
    items.sort(reverse=True, key=lambda x: x[0])
    
    # Count per label: how many times we've used each label
    label_count = {}
    
    total = 0  # The sum to return
    count = 0  # Total items selected
    
    for value, label in items:
        if label_count.get(label, 0) < useLimit:
            total += value
            label_count[label] = label_count.get(label, 0) + 1
            count += 1
            if count == numWanted:
                break  # We've selected enough items
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), due to sorting the pairs of (value, label) by value (with n being values.length). All other operations are O(n).
- **Space Complexity:** O(n) for storing the pairs and the label usage hash map.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the items could have negative values?  
  *Hint: You may need to consider whether dropping certain high-value-negative items is safer than using lowest non-negatives.*

- Can you do this in O(n) time without a full sort?  
  *Hint: Try using a counting sort (if value range is small) or a limited-size priority queue if numWanted is much less than n.*

- What if labels can be very large and hashing is expensive?  
  *Hint: Consider alternate data structures for tracking counts, or any restrictions in the input domain.*

### Summary
This problem uses a **greedy + sorting** pattern — process the "best" candidates first, while satisfying side constraints. The approach is common for selection/knapsack variants with simple caps per category, and is efficient when sorting is possible.  
This pattern appears in resource allocation, top-k filtering per group, and some greedy multi-knapsack problems.