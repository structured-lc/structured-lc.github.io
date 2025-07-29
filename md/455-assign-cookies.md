### Leetcode 455 (Easy): Assign Cookies [Practice](https://leetcode.com/problems/assign-cookies)

### Description  
Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie. Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] ≥ g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

### Examples  

**Example 1:**  
Input: `g = [1,2,3], s = [1,1]`  
Output: `1`  
*Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.*

**Example 2:**  
Input: `g = [1,2], s = [1,2,3]`  
Output: `2`  
*Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. You have 3 cookies and their sizes are big enough to gratify all of the children.*


### Thought Process (as if you're the interviewee)  
This is a classic greedy algorithm problem. We want to maximize the number of satisfied children.

**Key Insight:**
To maximize satisfaction, we should try to give the smallest possible cookie to each child that still satisfies them. This preserves larger cookies for children with higher greed factors.

**Greedy Strategy:**
1. Sort both arrays - children by greed factor (ascending) and cookies by size (ascending)
2. Use two pointers to iterate through both arrays
3. For each child (starting with least greedy), try to assign the smallest available cookie that satisfies them
4. If we can satisfy the current child, move to the next child and next cookie
5. If we can't satisfy the current child, try the next larger cookie

**Why this works:**
- If we can't satisfy a less greedy child with a cookie, we definitely can't satisfy a more greedy child with the same cookie
- By giving the smallest sufficient cookie to each child, we save larger cookies for children who need them


### Corner cases to consider  
- No children: Should return 0  
- No cookies: Should return 0  
- More children than cookies: Can only satisfy at most number of cookies  
- All cookies too small for any child: Should return 0  
- All children can be satisfied: Should return number of children  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def findContentChildren(g, s):
    # Sort both arrays to enable greedy approach
    g.sort()  # Sort children by greed factor (ascending)
    s.sort()  # Sort cookies by size (ascending)
    
    # Two pointers approach
    child_index = 0
    cookie_index = 0
    content_children = 0
    
    # Try to satisfy each child with available cookies
    while child_index < len(g) and cookie_index < len(s):
        # If current cookie can satisfy current child
        if s[cookie_index] >= g[child_index]:
            # Assign cookie to child
            content_children += 1
            child_index += 1  # Move to next child
        
        # Always move to next cookie (either assigned or too small)
        cookie_index += 1
    
    return content_children

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m log m + n log n) where m is the number of children and n is the number of cookies. The sorting operations dominate the complexity. The two-pointer traversal is O(m + n).
- **Space Complexity:** O(1) if we're allowed to modify input arrays, or O(m + n) if we need to create copies for sorting. The algorithm itself uses only constant extra space.


### Potential follow-up questions (as if you're the interviewer)  

- What if each child could receive multiple cookies and you want to minimize the total number of cookies used?  
  *Hint: This becomes a different optimization problem - you'd want to give exactly enough cookies to satisfy each child*

- What if cookies have different values/costs and you want to maximize satisfaction while minimizing cost?  
  *Hint: This becomes a more complex optimization problem, possibly requiring dynamic programming*

- How would you modify the algorithm if children have both minimum and maximum cookie size preferences?  
  *Hint: You'd need to check both bounds when assigning cookies, potentially requiring a different matching strategy*

### Summary
This problem demonstrates the greedy algorithm pattern for optimization problems. The key insight is recognizing that giving the smallest sufficient cookie to each child (starting from least greedy) maximizes the total number of satisfied children. The sorting and two-pointer technique is a common pattern for matching problems where you want to pair elements optimally. This approach appears in many similar problems involving resource allocation and matching.
