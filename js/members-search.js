const search = document.getElementById('search_bar');
dept = document.getElementById('dept_select');
role = document.getElementById('role_select');

if (search) {

    search.addEventListener('input', async function() {
        const response = await fetch('../api/api_members.php?search=' + this.value + '&dept=' + dept.value + '&role=' + role.value);
        const data = await response.json();
        
        clearMembers();

        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach(member => {
            const row = createRow(member);
            tbody.appendChild(row);
        });
    });

    dept.addEventListener('change', async function() {
        const response = await fetch('../api/api_members.php?search=' + search.value + '&dept=' + this.value + '&role=' + role.value);
        const data = await response.json();
        
        clearMembers();

        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach(member => {
            const row = createRow(member);
            tbody.appendChild(row);
        });
    });

    role.addEventListener('change', async function() {
        const response = await fetch('../api/api_members.php?search=' + search.value + '&dept=' + dept.value + '&role=' + this.value);
        const data = await response.json();
        
        clearMembers();

        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach(member => {
            const row = createRow(member);
            tbody.appendChild(row);
        });
    });
}

function clearMembers() {
    const members = document.querySelectorAll('.member');
    members.forEach(member => member.remove());
}

function createRow(member){
    const row = document.createElement('tr');
    
    const nameCell = createNameCell(member);
    const usernameCell = createUsernameCell(member);
    const roleCell = createRoleCell(member);
    const departmentCell = createDepartmentCell(member);
    const actionCell = createActionCell(member);

    row.appendChild(nameCell);
    row.appendChild(usernameCell);
    row.appendChild(roleCell);
    row.appendChild(departmentCell);
    row.appendChild(actionCell);

    return row;
}

function createNameCell(member){
    const nameCell = document.createElement('td');
    nameCell.classList.add('member_name');

    const profilePic = document.createElement('img');
    profilePic.src = '../actions/display_pic.action.php?id=' + member.image_id;
    profilePic.alt = 'Profile Photo';
    profilePic.classList.add('table_profile_pic');

    const userDetails = document.createElement('div');
    userDetails.classList.add('user_details');

    const name = document.createElement('span');
    name.innerText = member.name;

    const email = document.createElement('a');
    email.href = 'mailto:' + member.email;
    email.innerText = member.email;

    userDetails.appendChild(name);
    userDetails.appendChild(email);

    nameCell.appendChild(profilePic);
    nameCell.appendChild(userDetails);

    return nameCell;
}

function createUsernameCell(member){
    const usernameCell = document.createElement('td');
    usernameCell.classList.add('member_username');
    usernameCell.innerText = member.username;

    return usernameCell;
}

function createRoleCell(member){
    const roleCell = document.createElement('td');
    roleCell.classList.add('member_role');
    roleCell.innerText = member.isAdmin ? 'Admin' : member.isAgent ? 'Agent' : 'User';
    return roleCell;
}

function createDepartmentCell(member){
    const departmentCell = document.createElement('td');
    departmentCell.classList.add('member_department');

    member.departments.forEach(department => {
        const departmentName = document.createElement('span');
        departmentName.innerText = department;
        departmentCell.appendChild(departmentName);
        departmentCell.appendChild(document.createElement('br'));
    });

    return departmentCell;
}

function createActionCell(member){
    const actionCell = document.createElement('td');
    actionCell.classList.add('member_action');

    const editLink = document.createElement('a');
    editLink.href = 'edit_member.php?id=' + member.id;

    const editIcon = document.createElement('img');
    editIcon.src = '../assets/edit-icon.svg';
    editIcon.alt = 'Edit';
    editIcon.classList.add('action_icons');

    editLink.appendChild(editIcon);

    const deleteLink = document.createElement('a');
    deleteLink.href = 'delete_member.php?id=' + member.id;

    const deleteIcon = document.createElement('img');
    deleteIcon.src = '../assets/delete-icon.svg';
    deleteIcon.alt = 'Delete';
    deleteIcon.classList.add('action_icons');

    deleteLink.appendChild(deleteIcon);

    actionCell.appendChild(editLink);
    actionCell.appendChild(deleteLink);

    return actionCell;
}
