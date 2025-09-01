import icon from '../assets/chef.png'

function Header() {
    return (
        <header>
            <img src={icon} alt="chef-icon" className="chef-hat" />
            <h1>Chef Mistral</h1>
        </header>
    )
}

export default Header