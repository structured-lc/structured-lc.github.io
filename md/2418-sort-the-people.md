### Leetcode 2418 (Easy): Sort the People [Practice](https://leetcode.com/problems/sort-the-people)

### Description  
Given two arrays, **names** (list of strings) and **heights** (list of distinct positive integers), both of length n, where names[i] and heights[i] represent the name and height of the iᵗʰ person, return the names **sorted in descending order by the people's heights**.

### Examples  

**Example 1:**  
Input: `names = ["Mary","John","Emma"], heights = [180,165,170]`  
Output: `["Mary","Emma","John"]`  
*Explanation: Match each name to their height: Mary(180), John(165), Emma(170). Sort by heights descending: Mary (180), Emma (170), John (165).*

**Example 2:**  
Input: `names = ["Alice","Bob","Bob"], heights = [155,185,150]`  
Output: `["Bob","Alice","Bob"]`  
*Explanation: Bob(185), Alice(155), Bob(150); Sorted by descending heights: Bob(185), Alice(155), Bob(150).*

**Example 3:**  
Input: `names = ["Tom"], heights = `  
Output: `["Tom"]`  
*Explanation: Only one person. No sorting needed.*

### Thought Process (as if you’re the interviewee)  
The brute-force method is to:
- Pair each name with its height, so we have a list of (height, name) pairs.
- Since we want to sort by descending order of heights, we sort these pairs by height in descending order.
- After sorting, extract the names from each pair in the sorted list.

We could consider more advanced structures, but since n can be up to 1000, a sort is both efficient and straightforward (O(n log n)).

Why not use a dictionary? Because heights may be unique, but dictionaries don't maintain order by default, and we need a list result. Using tuples for sorting is easy and readable.  
The trade-off: This requires O(n) extra space for the paired list, but it's negligible for small n.

### Corner cases to consider  
- n = 1 (only one element)
- All names are the same (but heights are always unique per constraints)
- Heights are already sorted descending (should not affect)
- Heights are already sorted ascending
- Smallest or largest possible heights (e.g. 1 or 10⁵)
- Maximum n = 10³ (verify for large input, but within reasonable bounds)

### Solution

```python
def sortPeople(names, heights):
    # Pair each name with its corresponding height
    people = []
    for i in range(len(names)):
        people.append((heights[i], names[i]))
        
    # Sort the list of pairs in descending order by the first element (height)
    # Since heights are distinct, this completely orders the list
    people.sort(reverse=True)
    
    # Extract names from the sorted pairs
    result = []
    for height, name in people:
        result.append(name)
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of people. The main cost is the sort; each insertion and pair/tuple creation is O(1).
- **Space Complexity:** O(n), required to store the temporary list of (height, name) pairs and the result list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if there could be duplicate heights?
  *Hint: Think about how you would handle stability or grouping.*

- Can you do this in-place (without extra O(n) space)?
  *Hint: Consider modifying the names and heights lists directly.*

- What if names and heights are given as a list of objects?
  *Hint: Practice sorting custom objects using a specific key.*

### Summary
The solution uses the classic **sorting by a custom key** pattern, pairing related values and sorting the result, then projecting the sorted result. This approach is common when jointly sorting parallel arrays or objects based on an attribute. It's efficient for moderate input sizes and widely applicable to "sort by attribute, then report" interview problems.


### Flashcard
Sort names by height in descending order to arrange people by height.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
- Sort Array by Increasing Frequency(sort-array-by-increasing-frequency) (Easy)
- Sort the Students by Their Kth Score(sort-the-students-by-their-kth-score) (Medium)